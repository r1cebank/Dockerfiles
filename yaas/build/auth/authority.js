/**
 * Created by r1cebank on 8/24/15.
 */

/*!
 *  This is the authority file, which handles all authority in the app
 *  it will load the appropriate handling functions based on the type
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilAppsingleton = require('../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Authority = (function () {

    //  Constructor will load the appropriate methods based on type

    function Authority(type) {
        // istanbul ignore next

        var _this = this;

        _classCallCheck(this, Authority);

        //  Log tags
        this.TAG = 'authority:' + type;
        //  Supress warnings
        this.checkauth = function (a) {
            _utilAppsingleton2['default'].getInstance().L.error(_this.TAG, 'this should not be printed');
        };
        this.checkrole = function (u) {
            _utilAppsingleton2['default'].getInstance().L.error(_this.TAG, 'this should not be printed');
        };

        _utilAppsingleton2['default'].getInstance().L.info(this.TAG, 'loading modules');

        _lodash2['default'].assign(this, require('./' + type + '/checkauth.js'));
        _lodash2['default'].assign(this, require('./' + type + '/checkrole.js'));
        _utilAppsingleton2['default'].getInstance().L.info(this.TAG, 'modules loading complete');
    }

    ///*!
    // *  For Express, we added these functions to help the authenticate
    // *  This also need to be a Express middleware
    // */
    //authenticate(req, res) {
    //
    //    //  To make sure we always have the auth field, we need to combine all the request params
    //    var request = _.extend(req.params || {}, req.query || {}, req.body || {});
    //
    //    //  Checkath will return the user if login correct or return undefined if error occured
    //    var user = this.checkauth(request.auth);
    //    console.log(user)
    //    if(!user) {
    //        res.status(403).send({error: `auth failed for ${this.TAG}`});
    //        return false;
    //    } else {
    //        return true;
    //    }
    //}

    /*!
     *  After authenticate is finished running, we need to check if the user is authenticated for that role
     */

    _createClass(Authority, [{
        key: 'hasRole',
        value: function hasRole(req, res, role) {

            //  To make sure we always have the auth field, we need to combine all the request params
            var request = _lodash2['default'].extend(req.params || {}, req.query || {}, req.body || {});

            //  Check if overwrite exist for this role, if exist, overwrite the checkauth and check role function
            if (_utilAppsingleton2['default'].getInstance().auth.overwrites[role]) {

                //  Get overwrite auth type
                var type = _utilAppsingleton2['default'].getInstance().auth.overwrites[role];
                _utilAppsingleton2['default'].getInstance().L.warn(this.TAG, 'overwrite auth method to ' + type);
                this.checkauth = require('./' + type + '/checkauth.js').checkauth;
                this.checkrole = require('./' + type + '/checkrole.js').checkrole;
            }

            //  Checkath will return the user if login correct or return undefined if error occured
            try {
                var user = this.checkauth(request.auth);
            } catch (e) {
                res.status(400).send({ error: e });
                return false;
            }

            if (!user) {
                res.status(403).send({ error: 'auth failed for ' + this.TAG });
                return false;
            } else {
                if (!this.checkrole(user, role)) {
                    res.status(403).send({ error: request.auth + ' not permitted for ' + role });
                    return false; //  We still need to return since the value will be used to wrapped in if
                } else {
                        return true;
                    }
            }
        }
    }]);

    return Authority;
})();

exports['default'] = Authority;
module.exports = exports['default'];
//# sourceMappingURL=../auth/authority.js.map