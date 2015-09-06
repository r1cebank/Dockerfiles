/**
 * Created by r1cebank on 8/19/15.
 */

/*!
 *  Bootstrap is ran first will set all the necessary things like in appsingleton
 *  loggers, configs and many other things. It is reusable in many other applications
 */

'use strict';

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appsingleton = require('./appsingleton');

var _appsingleton2 = _interopRequireDefault(_appsingleton);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _tingodb = require('tingodb');

var _tingodb2 = _interopRequireDefault(_tingodb);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _authAuthority = require('../auth/authority');

var _authAuthority2 = _interopRequireDefault(_authAuthority);

function bootstrap() {

    //  Log tag
    var TAG = "bootstrap";

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = _appsingleton2['default'].getInstance();

    //  Creating a new shared instance for winston logger
    sharedInstance.Log = new _winston2['default'].Logger({
        transports: [new _winston2['default'].transports.Console({
            colorize: 'all',
            level: 'verbose'
        })]
    });
    sharedInstance.L = {
        verbose: function verbose(tag, log) {
            sharedInstance.Log.verbose('[' + tag + '] : ' + log);
        },
        info: function info(tag, log) {
            sharedInstance.Log.info('[' + tag + '] : ' + log);
        },
        error: function error(tag, log) {
            sharedInstance.Log.error('[' + tag + '] : ' + log);
        },
        warn: function warn(tag, log) {
            sharedInstance.Log.warn('[' + tag + '] : ' + log);
        }
    };

    //  Create all the folder needed for this application
    (0, _mkdirp2['default'])(sharedInstance.config.server.database);
    (0, _mkdirp2['default'])(sharedInstance.config.server.storage.dest);
    (0, _mkdirp2['default'])(sharedInstance.config.server.storage.processed);

    //  Setup local master db connection here
    var Engine = (0, _tingodb2['default'])(); //  Create a db engine

    //  Create the database for yaas, mongodb compliant
    sharedInstance.buckets = new Engine.Db(sharedInstance.config.server.database, {});
    sharedInstance.L.info(TAG, sharedInstance.config.server.database + ' is loaded');

    //  Promisify functions

    //  Setup authority
    sharedInstance.authority = new _authAuthority2['default'](sharedInstance.config.auth.type);
    sharedInstance.auth = sharedInstance.config.auth;

    sharedInstance.L.info(TAG, "Bootstrap complete!");
}

module.exports = bootstrap;
//# sourceMappingURL=../util/bootstrap.js.map