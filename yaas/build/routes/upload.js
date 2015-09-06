/**
 * Created by r1cebank on 8/20/15.
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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function upload(req, res) {

    //  Log tag
    var TAG = "route:upload";

    //  Get shared instance from singleton
    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {

        //  If no file supplied, error back
        if (!req.file) {
            res.status(404).send({ error: "file not supplied" });
            resolve({});
        } else {
            var bucket = sharedInstance.buckets.collection(req.params.bucket);
            bucket.findOne({ originalname: req.file.originalname }, function (err, doc) {
                if (doc) {
                    //  File exists, uploading a new version.

                    //  We have a new file, generate a new version code
                    var version = _shortid2['default'].generate();

                    var file = _lodash2['default'].clone(doc);
                    file.versions = _lodash2['default'].clone(doc.versions);
                    file.versions[version] = req.file.path;
                    file.latestversion = version;
                    bucket.update({ originalname: req.file.originalname }, {
                        $set: {
                            versions: file.versions,
                            latestversion: version
                        }
                    }, function (error, doc) {
                        res.send(file);
                        sharedInstance.L.info(TAG, 'file ' + file.originalname + ' updated, version ' + file.latestversion);
                    });
                } else {

                    var version = _shortid2['default'].generate();

                    //  We have a new file, generate a new version code
                    var versions = {};
                    versions[version] = req.file.path;

                    //  Clone the file object
                    var file = _lodash2['default'].clone(req.file);
                    file.versions = versions;
                    file.latestversion = version;
                    file.url = file.url = (0, _urlJoin2['default'])(sharedInstance.config.server.host, req.params.bucket, req.file.originalname);

                    //  Insert the record into bucket
                    bucket.insert(file, function (err, doc) {
                        sharedInstance.L.info(TAG, "file uploaded");
                    });
                    res.send(file);
                }
            });
            resolve({});
        }
    });
}

exports['default'] = upload;
module.exports = exports['default'];
//# sourceMappingURL=../routes/upload.js.map