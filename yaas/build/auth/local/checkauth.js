/**
 * Created by r1cebank on 8/24/15.
 */

/*!
 *  This is the method for local authentication, this will grab the information
 *  from config and return the roles(users)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

function checkauth(auth) {

  var TAG = 'auth:local:checkauth';

  //  Returns roles for api key
  return _utilAppsingleton2['default'].getInstance().auth.keys[auth];
}

exports['default'] = { checkauth: checkauth };
module.exports = exports['default'];
//# sourceMappingURL=../../auth/local/checkauth.js.map