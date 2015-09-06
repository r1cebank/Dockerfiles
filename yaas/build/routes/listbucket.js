/**
 * Created by r1cebank on 8/22/15.
 */

/*!
 *  This is the list bucket route, does only one thing, list all buckets in index file
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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _junk = require('junk');

var _junk2 = _interopRequireDefault(_junk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function listbucket(req, res) {

    //  Log tag
    var TAG = "route:listbucket";

    //  Get shared instance from singleton
    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {
        _fs2['default'].readdir(sharedInstance.config.server.database, function (err, files) {
            files = files.filter(_junk2['default'].not);
            var buckets = files.map(function (filename) {
                return (0, _urlJoin2['default'])(sharedInstance.config.server.host, filename);
            });
            res.send({ buckets: buckets });
        });
        resolve({});
    });
}

exports['default'] = listbucket;
module.exports = exports['default'];
//# sourceMappingURL=../routes/listbucket.js.map