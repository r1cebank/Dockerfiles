/**
 * Created by r1cebank on 8/24/15.
 */

/*!
 *  None will let everyone get in the system, anything is possible
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

  var TAG = 'auth:none:checkauth';
  _utilAppsingleton2['default'].getInstance().L.verbose(TAG, 'checkauth is passing noauth');
  return { user: 'noauth' };
}

exports['default'] = { checkauth: checkauth };
module.exports = exports['default'];
//# sourceMappingURL=../../auth/none/checkauth.js.map