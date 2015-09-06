/**
 * Created by r1cebank on 8/11/15.
 */

/*!
 *  This sis the AppSingleton, this is shared across entire app
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSingleton = (function () {
    function AppSingleton() {
        _classCallCheck(this, AppSingleton);

        console.error("Do not construct singleton using the constructor!");
        this.sharedInstance = {};
    }

    _createClass(AppSingleton, null, [{
        key: "getInstance",
        value: function getInstance() {
            if (!this.sharedInstance) {
                this.sharedInstance = {};
            }
            return this.sharedInstance;
        }
    }]);

    return AppSingleton;
})();

exports["default"] = AppSingleton;
module.exports = exports["default"];
//# sourceMappingURL=../util/appsingleton.js.map