/**
 * Created by r1cebank on 8/20/15.
 */

/*!
 *  I am not sure this is required, but it made source code looks much nicer
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _getfile = require('./getfile');

var _getfile2 = _interopRequireDefault(_getfile);

var _listfile = require('./listfile');

var _listfile2 = _interopRequireDefault(_listfile);

var _listbucket = require('./listbucket');

var _listbucket2 = _interopRequireDefault(_listbucket);

var _listversion = require('./listversion');

var _listversion2 = _interopRequireDefault(_listversion);

/*!
 *  Export all the routes
 */

exports['default'] = {
  upload: _upload2['default'],
  getfile: _getfile2['default'],
  listfile: _listfile2['default'],
  listbucket: _listbucket2['default'],
  listversion: _listversion2['default']
};
module.exports = exports['default'];
//# sourceMappingURL=../routes/routes.js.map