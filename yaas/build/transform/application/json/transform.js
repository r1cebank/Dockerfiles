/**
 * Created by r1cebank on 8/28/15.
 */

/*!
 *  This will transform the json
 *  currently supports jsonpath query
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../../../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//  Old require still using require
var hash = require('json-hash');

function transform(req, file, version) {

    var TAG = 'transform:application:json';

    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve, reject) {
        // If no param supplied, resolve
        if (_lodash2['default'].isEmpty(req)) {
            sharedInstance.L.info(TAG, "no transform options provided.");
            resolve(file);
        } else {
            //  Needed the version number to enforce the files don't collide.
            req.v = version;
            var filename = _path2['default'].join(process.cwd(), sharedInstance.config.server.storage.processed, hash.digest(req) + '.json');
            //  Needs to delete v to avoid confusions
            delete req.v;
            _fs2['default'].stat(filename, function (err, stat) {
                //  If exists in the system, don't bother processing it
                if (err) {
                    //  Read this json file
                    _jsonfile2['default'].readFile(file, function (err, obj) {
                        if (!err) {

                            //  This might be used if we have more than one transform params
                            var result = _lodash2['default'].clone(obj);
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = Object.keys(req)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var key = _step.value;

                                    switch (key) {
                                        case "query":
                                            result = _jsonpath2['default'].query(result, req.query);
                                            break;
                                        default:
                                            sharedInstance.L.warn(TAG, 'unsupported action ' + key + '.');
                                    }
                                }
                                //  Finally write the file
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

                            _jsonfile2['default'].writeFile(filename, result, function (err) {
                                if (!err) {
                                    resolve(filename);
                                } else {
                                    sharedInstance.L.error(TAG, 'error occured: ' + err.toString());
                                    resolve(file);
                                }
                            });
                        } else {
                            sharedInstance.L.error(TAG, 'error occured: ' + err.toString());
                            resolve(file);
                        }
                    });
                } else {
                    sharedInstance.L.info(TAG, 'skip processing since file exists');
                    resolve(filename);
                }
            });
        }
    });
}

exports['default'] = transform;
module.exports = exports['default'];
//# sourceMappingURL=../../../transform/application/json/transform.js.map