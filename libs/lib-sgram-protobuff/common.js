"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_PACKAGE_NAME = exports.protobufPackage = void 0;
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = 'common';
exports.COMMON_PACKAGE_NAME = 'common';
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
//# sourceMappingURL=common.js.map