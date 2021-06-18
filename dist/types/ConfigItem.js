"use strict";
exports.__esModule = true;
exports.SendMode = void 0;
var SendMode;
(function (SendMode) {
    /** send to target ip */
    SendMode[SendMode["IP"] = 1] = "IP";
    /** send to broadcast ip */
    SendMode[SendMode["broadcast"] = 2] = "broadcast";
})(SendMode = exports.SendMode || (exports.SendMode = {}));
