"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_PROTOBUF_PACKAGE_NAME = exports.protobufPackage = void 0;
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = 'google.protobuf';
exports.GOOGLE_PROTOBUF_PACKAGE_NAME = 'google.protobuf';
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
//# sourceMappingURL=timestamp.js.map