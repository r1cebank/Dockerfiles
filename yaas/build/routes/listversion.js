/**
 * Created by r1cebank on 8/22/15.
 */

/*!
 *  This is the list version role, we will need this to list all the file versions for a file
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

function listversion(req, res) {

    //  Log tag
    var TAG = "route:upload";

    //  Get shared instance from singleton
    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {

        //  Open the nedb file to query later
        var bucket = sharedInstance.buckets.collection(req.params.bucket);

        //  Query the file
        bucket.findOne({ originalname: req.params.filename }, function (err, doc) {
            if (!doc) {
                //  If file is not found, send 404 and a error
                res.status(404).send({ error: 'file ' + req.params.filename + ' not found.' });
            } else {
                //  List all versions
                var urls = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(doc.versions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        urls.push((0, _urlJoin2['default'])(sharedInstance.config.server.host, req.params.bucket, req.params.filename, '?v=' + key));
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
            }
        });
        resolve({});
    });
}

exports['default'] = listversion;
module.exports = exports['default'];
//# sourceMappingURL=../routes/listversion.js.map