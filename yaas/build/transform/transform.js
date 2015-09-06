/**
 * Created by r1cebank on 8/23/15.
 */

/*!
 *  This is the transform function, it takes the file type and determines if the transform file exists
 *  If file exist, process and send the processed file
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function transform(res, type, req, file, version) {

    var TAG = 'transform';

    var start = new Date();
    var end = new Date();

    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    //  Ger new filename with extensions

    //  for image/jpeg type, the transform file will be stored in /image/jpeg/transform.js
    var transformFile = _path2['default'].join(__dirname, type.split('/')[0], type.split('/')[1], 'transform.js');

    //  Do all the processing, and return the transformed file
    _fs2['default'].stat(transformFile, function (err, stat) {
        //  If exists in the system, dont bother processing it
        if (!err) {

            //  Call the transformation file and get the final processed file.
            require(transformFile)(req, file, version).then(function (file) {
                //  After processing, the output can be two types, JSON or filepath
                if (typeof file === 'object') {
                    //  If it is object, then just send it to as response.
                    sharedInstance.L.verbose(TAG, 'sending result as response');
                    res.send(file);
                } else {
                    //  If it is not, then send as a file.
                    sharedInstance.L.verbose(TAG, 'sending result as file');
                    res.type(type);
                    res.sendFile(file);
                }
                end = new Date();
                sharedInstance.L.info(TAG, 'Processing time ' + (end - start) + 'ms');
            })['catch'](function (e) {
                //  If error is caught, send the original file
                res.sendFile(file);
                sharedInstance.L.error(TAG, e.toString());
            }).done();
        } else {
            //  File don't support transform
            res.sendFile(file);
        }
    });
}

exports['default'] = { transform: transform };
module.exports = exports['default'];
//# sourceMappingURL=../transform/transform.js.map