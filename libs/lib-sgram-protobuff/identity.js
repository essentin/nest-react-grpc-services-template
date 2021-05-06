"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDENTITY_SERVICE_NAME = exports.IdentityServiceControllerMethods = exports.IDENTITY_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = 'identity';
exports.IDENTITY_PACKAGE_NAME = 'identity';
function IdentityServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ['login', 'authenticate'];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            microservices_1.GrpcMethod('IdentityService', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            microservices_1.GrpcStreamMethod('IdentityService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.IdentityServiceControllerMethods = IdentityServiceControllerMethods;
exports.IDENTITY_SERVICE_NAME = 'IdentityService';
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
//# sourceMappingURL=identity.js.map