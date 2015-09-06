/**
 * yaas.js entry file.
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

'use strict';

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//   Needed for some babel functions, remove after ES6

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _utilAppsingleton = require('./util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _utilBootstrap = require('./util/bootstrap');

var _utilBootstrap2 = _interopRequireDefault(_utilBootstrap);

var _utilStartup = require('./util/startup');

var _utilStartup2 = _interopRequireDefault(_utilStartup);

var _nodeInfo = require('node-info');

var _nodeInfo2 = _interopRequireDefault(_nodeInfo);

var _configConfig = require('./config/config');

var _configConfig2 = _interopRequireDefault(_configConfig);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

//  Log TAG
require("babel/polyfill");var TAG = "index";

//  HTTPS Certificates
//  var key = Fs.readFileSync('./cert/cert_p.p12', 'utf8');
//  var cert = Fs.readFileSync('./cert/cert.cer', 'utf8');
//  var credentials = {key, cert};

//  Grab the port number or get from deploy environment
var PORT = process.env.PORT || _configConfig2['default'].server.port;
var PORT_SSL = process.env.PORT_SSL || _configConfig2['default'].server.port_ssl;

//  AppSingleton Instance
var sharedInstance = _utilAppsingleton2['default'].getInstance();

/*!
 *  Enable sourcemap support (if present)
 */
var sourcemaps = require.resolve('source-map-support');
if (sourcemaps) {
  require(sourcemaps).install();
}

/*!
 *  Root express application.
 */
var app = (0, _express2['default'])();

//  Upload instance
var storage = _multer2['default'].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _configConfig2['default'].server.storage.dest);
  },
  filename: function filename(req, file, cb) {
    //  If custom file type, modify the mimetype to yaas/<type>
    if (file.originalname.split('.').pop() == 'ysql') file.mimetype = 'yaas/sql';
    cb(null, _shortid2['default'].generate() + ('.' + file.originalname.split('.').pop()));
  }
});
var upload = (0, _multer2['default'])({ storage: storage });

/*!
 *  Pass the express app + multer + config instance to appsingleton
 */
sharedInstance.app = app;
sharedInstance.upload = upload;
sharedInstance.config = _configConfig2['default'];

/*!
 *  Use global express middleware here.
 */
app.use(_bodyParser2['default'].json()); //  Using bodyparser for POST requests
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use((0, _nodeInfo2['default'])()); // Using NodeInfo to display server information

/*!
 *  Bootstrap the application, setting the proper shared variables in AppSingleton
 */
(0, _utilBootstrap2['default'])();

/*!
 *  Startup the app, setting the appropriate routes and settings.
 */

(0, _utilStartup2['default'])().then(function () {
  var server = _http2['default'].createServer(app).listen(PORT);
  //var server_https = HTTPS.createServer(credentials, app).listen(PORT_SSL);
  var host = server.address().address;
  sharedInstance.L.info(TAG, 'HTTP Server running at: ' + host + ':' + PORT);
  //sharedInstance.L.info(TAG, `HTTPS Server running at: ${host}:${PORT_SSL}`);
});
//# sourceMappingURL=index.js.map