/**
 * Created by r1cebank on 8/23/15.
 */

/*!
 *  This will transform the images and output
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

var _lwip = require('lwip');

var _lwip2 = _interopRequireDefault(_lwip);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//  Old require still using require
var hash = require('json-hash');

function transform(req, file, version) {

    var TAG = 'transform:image:jpeg';

    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve, reject) {

        // If no param supplied, resolve
        if (_lodash2['default'].isEmpty(req)) {
            sharedInstance.L.info(TAG, "no transform options provided.");
            resolve(file);
        } else {
            _lwip2['default'].open(file, function (err, image) {
                if (err) {
                    //  If there is error, return the original file
                    resolve(file);
                }
                var batch = image.batch();

                //  Needed the version number to enforce the files don't collide.
                req.v = version;
                var filename = _path2['default'].join(process.cwd(), sharedInstance.config.server.storage.processed, hash.digest(req) + '.jpeg');
                //  Needs to delete v to avoid confusions
                delete req.v;

                _fs2['default'].stat(filename, function (err, stat) {
                    //  If exists in the system, dont bother processing it
                    if (err) {
                        //  All processing goes here.
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = Object.keys(req)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var key = _step.value;

                                try {

                                    /*!
                                     *  I am aware that having a big switch statement is not ideal,
                                     *  but thinking about having a chainable pipe with promises is just too
                                     *  much code.
                                     *  If we decides that chainable transform is needed, i am happy to implement
                                     */
                                    switch (key) {
                                        case "scale":
                                            //  Scale the image
                                            if (!isNaN(req[key])) {
                                                batch = batch.scale(Number(req[key]));
                                            }
                                            break;
                                        case "crop":
                                            //  Crop the image
                                            if (JSON.parse(req[key]) instanceof Array) {
                                                var array = JSON.parse(req[key]);
                                                if (array.length == 2) {
                                                    batch = batch.crop(array[0], array[1]);
                                                } else if (array.length == 4) {
                                                    batch = batch.crop(array[0], array[1], array[2], array[3]);
                                                }
                                            }
                                            break;
                                        case "rotate":
                                            if (!isNaN(req[key])) {
                                                batch = batch.rotate(Number(req[key]), 'white');
                                            }
                                            break;
                                        case "blur":
                                            if (!isNaN(req[key])) {
                                                batch = batch.blur(Number(req[key]));
                                            }
                                            break;
                                        case "sharpen":
                                            if (!isNaN(req[key])) {
                                                batch = batch.sharpen(Number(req[key]));
                                            }
                                            break;
                                        case "mirror":
                                            var actions = ['x', 'y', 'xy'];
                                            if (_lodash2['default'].includes(actions, req[key])) {
                                                batch = batch.mirror(req[key]);
                                            }
                                            break;
                                        case "saturate":
                                            if (!isNaN(req[key])) {
                                                batch = batch.saturate(Number(req[key]));
                                            }
                                            break;
                                        case "lighten":
                                            if (!isNaN(req[key])) {
                                                batch = batch.lighten(Number(req[key]));
                                            }
                                            break;
                                        case "darken":
                                            if (!isNaN(req[key])) {
                                                batch = batch.darken(Number(req[key]));
                                            }
                                            break;
                                        case "hue":
                                            if (!isNaN(req[key])) {
                                                batch = batch.hue(Number(req[key]));
                                            }
                                            break;
                                        default:
                                            sharedInstance.L.warn(TAG, 'unsupported action ' + key + '.');
                                    }
                                } catch (e) {
                                    /*! After a error is caught, reject with error and do whatever to recover
                                     *  transform.js (line 31-32)
                                     */

                                    reject(e);
                                    return;
                                }
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

                        batch.writeFile(filename, function (err) {
                            if (err) {
                                sharedInstance.L.error(TAG, 'error occured: ' + err.toString());
                                resolve(file);
                            } else {
                                resolve(filename);
                            }
                        });
                    } else {
                        sharedInstance.L.info(TAG, 'skip processing since file exists');
                        resolve(filename);
                    }
                });
            });
        }
    });
}

exports['default'] = transform;
module.exports = exports['default'];
//# sourceMappingURL=../../../transform/image/jpeg/transform.js.map