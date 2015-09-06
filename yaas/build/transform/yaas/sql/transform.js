/**
 * Created by r1cebank on 8/30/15.
 */

/*!
 *  This will transform the ysql object into actual database query result
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

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _queryBuilder = require('./queryBuilder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

//  Old require still using require
var hash = require('json-hash');

function transform(req, file, version) {

    var TAG = 'transform:yaas:sql';

    var sharedInstance = _utilAppsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve, reject) {
        req.v = version;
        var filename = _path2['default'].join(process.cwd(), sharedInstance.config.server.storage.processed, hash.digest(req) + '.ysql');
        //  Needs to delete v to avoid confusions
        delete req.v;
        //  If exists in the system, don't bother processing it
        //  Read this json file
        _jsonfile2['default'].readFile(file, function (err, obj) {
            if (!err) {
                //  No error while reading ysql, continue to processing
                //  Open a new connection -> cache the connection -> query -> grab the results
                var connection = _mysql2['default'].createConnection(obj.data.server);
                //  Connect to MySQL
                connection.connect();
                //  For queries have placeholders, replace them with real values
                var query = _queryBuilder2['default'].buildQuery(obj.data.query, obj.data.input, req, connection);
                //  TODO: Should I persist the connections?
                connection.query(query, function (err, rows) {
                    if (err) {
                        sharedInstance.L.error(TAG, 'error occurred: ' + err.toString());
                        resolve({ error: err.toString() });
                    }
                    resolve(rows);
                    //  Close the connection
                    connection.destroy();
                });
            } else {
                sharedInstance.L.error(TAG, 'error occurred: ' + err.toString());
                resolve({ error: err.toString() });
            }
        });
    });
}

exports['default'] = transform;
module.exports = exports['default'];
//# sourceMappingURL=../../../transform/yaas/sql/transform.js.map