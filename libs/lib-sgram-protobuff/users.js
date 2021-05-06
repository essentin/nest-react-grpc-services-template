"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_SERVICE_NAME = exports.UserServiceControllerMethods = exports.USERS_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = 'users';
exports.USERS_PACKAGE_NAME = 'users';
function UserServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ['findOne', 'getAll', 'findByEmail', 'set'];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            microservices_1.GrpcMethod('UserService', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            microservices_1.GrpcStreamMethod('UserService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.UserServiceControllerMethods = UserServiceControllerMethods;
exports.USER_SERVICE_NAME = 'UserService';
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
//# sourceMappingURL=users.js.map