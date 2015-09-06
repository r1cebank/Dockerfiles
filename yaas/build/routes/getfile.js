/**
 * Created by r1cebank on 8/21/15.
 */

/*!
 *  This is the getfile path, which handles retrieve the file and apply any
 *  transformation required by the client
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _transformTransform = require('../transform/transform');

var _transformTransform2 = _interopRequireDefault(_transformTransform);

//  Old require still using require
var hash = require('json-hash');

function getfile(req, res) {

    //  Log tag
    var TAG = "route:upload";

    //  Get shared instance from singleton
    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {

        //  read the Nedb database stored on disk.
        var bucket = sharedInstance.buckets.collection(req.params.bucket);

        //  First the file needs to exist
        bucket.findOne({ originalname: req.params.filename }, function (err, doc) {
            if (!doc) {
                res.status(404).send({ error: 'file ' + req.params.filename + ' not found.' });
            } else {
                // Try to see if there is a get param for version
                var version = doc.latestversion;
                if (req.query.v) version = req.query.v;

                //  Check if version exists
                if (!doc.versions[version]) {
                    res.status(404).send({ error: 'version ' + version + ' not found' });
                } else {

                    //  Combining inputs
                    var request = _lodash2['default'].extend(req.params || {}, req.query || {}, req.body || {});

                    //  This is used only for caching.
                    var requestForHashing = _lodash2['default'].clone(request);

                    //  Again, delete the auth which is going to cause unexpected issue in hashing.
                    requestForHashing.v = version;
                    delete requestForHashing.auth;

                    //  Needs to delete to avoid issues when deciding if processing is needed
                    delete request.v;
                    delete request.auth;
                    delete request.bucket;
                    delete request.filename;
                    sharedInstance.L.verbose(TAG, 'request for hashing: ' + JSON.stringify(requestForHashing));

                    /*! Used for caching, since we need unique hash for each request and make sure the
                     *  same request yields the same hash so we are ensure that our cache is always valid
                     *  for a particular request. But! need a better caching system so that we won't use up
                     *  memory/old cache is purged once TTL passed.
                     */
                    var requestHash = hash.digest(requestForHashing);
                    sharedInstance.L.verbose(TAG, 'request hash: ' + requestHash);
                    // Processing
                    _transformTransform2['default'].transform(res, doc.mimetype, request, _path2['default'].join(process.cwd(), doc.versions[version]), version);
                }
            }
        });
        resolve({});
    });
}

exports['default'] = getfile;
module.exports = exports['default'];
//# sourceMappingURL=../routes/getfile.js.map