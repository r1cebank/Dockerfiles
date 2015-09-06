/**
 * Created by r1cebank on 9/1/15.
 */

/*!
 *  This file provides the needed function to create query from user input,
 *  replacing the placeholders with real values and make sure input are escaped
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _utilAppsingleton = require('../../../util/appsingleton');

var _utilAppsingleton2 = _interopRequireDefault(_utilAppsingleton);

function buildQuery(query, input, req, connection) {

    //  Log Tag
    var TAG = "transform:yaas:sql:build";

    //  Shared instance
    var sharedInstance = _utilAppsingleton2["default"].getInstance();

    //  Regex
    var nameRegex = /<%([0-9]+)>/;
    var valueRegex = /<\$([0-9]+)>/;

    //  Never declare variable in a loop
    var match = "",
        match0 = "",
        key = "";

    // replace query params
    while (nameRegex.test(query)) {
        // Loop until regex no longer match item
        match = nameRegex.exec(query)[1]; //  Get the param number
        match0 = nameRegex.exec(query)[0]; //  Get the actual match
        key = input[match]; //  Get the key name
        query = query.replace(match0, key); //  Replace the key with actual value name
    }

    //  replace the values in a loop
    while (valueRegex.test(query)) {
        // Loop until regex no longer match item
        match = valueRegex.exec(query)[1];
        match0 = valueRegex.exec(query)[0];
        key = connection.escape(req[input[match]]);
        query = query.replace(match0, key);
    }

    sharedInstance.L.verbose(TAG, "query built: " + query);

    return query;
}

exports["default"] = { buildQuery: buildQuery };
module.exports = exports["default"];
//# sourceMappingURL=../../../transform/yaas/sql/queryBuilder.js.map