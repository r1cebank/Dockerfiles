/**
 * Created by r1cebank on 8/24/15.
 */

/*!
 *  None will not care about roles, everyhting is permitted
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

function checkrole(user, role) {

  /*  Any role will be permitted, but will check user to see if the user is coming from the none checkauth
   *  If user doesn't equal no auth, we will fail.
   */

  var TAG = 'auth:none:checkrole';

  if (user.user == 'noauth') {
    _utilAppsingleton2['default'].getInstance().L.verbose(TAG, 'checkauth is passing allow');
    return true;
  } else {
    _utilAppsingleton2['default'].getInstance().L.verbose(TAG, 'something is very refuse');
    return false;
  }
}

exports['default'] = { checkrole: checkrole };
module.exports = exports['default'];
//# sourceMappingURL=../../auth/none/checkrole.js.map