/**
 * Created by r1cebank on 8/22/15.
 */

/*!
 *  This is the list file route, which will output all the files in a bucket
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

function listfile(req, res) {

    //  Log tag
    var TAG = "route:upload";

    //  Get shared instance from singleton
    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {

        //  Open this Nedb so a find query can be executed later
        var bucket = sharedInstance.buckets.collection(req.params.bucket);

        //  Using {} will yield us all the records in the bucket
        bucket.find().toArray(function (err, docs) {
            var urls = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var doc = _step.value;

                    //  All we want is a array of urls back to the client
                    urls.push((0, _urlJoin2['default'])(sharedInstance.config.server.host, req.params.bucket, doc.originalname));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            res.send(urls);
        });
        resolve({});
    });
}

exports['default'] = listfile;
module.exports = exports['default'];
//# sourceMappingURL=../routes/listfile.js.map