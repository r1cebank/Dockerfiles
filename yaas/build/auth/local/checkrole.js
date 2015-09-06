/**
 * Created by r1cebank on 8/24/15.
 */

/*!
 *  This is the checkrole method, input is a list of roles that user is the user with roles
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilAppsingleton = require('../../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function checkrole(user, role) {

  /*  Any role will be permitted, but will check user to see if the user is coming from the none checkauth
   *  If user doesn't equal no auth, we will fail.
   */

  var TAG = 'auth:local:checkrole';

  if (_lodash2['default'].includes(user.roles, role)) {
    _utilAppsingleton2['default'].getInstance().L.verbose(TAG, 'local is passing allow');
    return true;
  } else {
    _utilAppsingleton2['default'].getInstance().L.verbose(TAG, 'local is passing refuse');
    return false;
  }
}

exports['default'] = { checkrole: checkrole };
module.exports = exports['default'];
//# sourceMappingURL=../../auth/local/checkrole.js.map