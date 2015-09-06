/**
 * Created by r1cebank on 8/19/15.
 */

/*!
 *  After bootstrap, all the necessary promises, values are defined in AppSingleton
 *  In startup.js we will begin loading the appropriate routes, settings
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appsingleton = require('./appsingleton');

var _appsingleton2 = _interopRequireDefault(_appsingleton);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _routesRoutes = require('../routes/routes');

var _routesRoutes2 = _interopRequireDefault(_routesRoutes);

function startup() {

    //  Log tag
    var TAG = "startup";

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = _appsingleton2['default'].getInstance();

    return new _bluebird2['default'](function (resolve) {

        //  Setup routes for app

        //  Setup upload
        sharedInstance.app.post('/:bucket/upload', sharedInstance.upload.single('file'), function (req, res) {
            if (sharedInstance.authority.hasRole(req, res, 'bucket:upload')) {
                _routesRoutes2['default'].upload(req, res).then()['catch']().done();
            }
        });
        //  Bucket creation path
        sharedInstance.app.post('/bucket', function (req, res) {
            if (sharedInstance.authority.hasRole(req, res, 'bucket:create')) {
                _routesRoutes2['default'].bucket(req, res).then()['catch']().done();
            }
        });
        //  List all buckets
        sharedInstance.app.get('/list', function (req, res) {

            /*!
             *  Looks like cannot use as middleware.
             */
            if (sharedInstance.authority.hasRole(req, res, 'yaas:list')) {
                _routesRoutes2['default'].listbucket(req, res).then()['catch']().done();
            }
        });
        //  List all files in bucket
        sharedInstance.app.get('/:bucket', function (req, res) {
            if (sharedInstance.authority.hasRole(req, res, 'bucket:list')) {
                _routesRoutes2['default'].listfile(req, res).then()['catch']().done();
            }
        });
        //  List all versions for file
        sharedInstance.app.get('/:bucket/:filename/list', function (req, res) {
            if (sharedInstance.authority.hasRole(req, res, 'version:list')) {
                _routesRoutes2['default'].listversion(req, res).then()['catch']().done();
            }
        });
        //  Get uploaded file
        sharedInstance.app.get('/:bucket/:filename', function (req, res) {
            if (sharedInstance.authority.hasRole(req, res, 'file:get')) {
                _routesRoutes2['default'].getfile(req, res).then()['catch']().done();
            }
        });
        resolve({});
    });
}
exports['default'] = startup;
module.exports = exports['default'];
//# sourceMappingURL=../util/startup.js.map