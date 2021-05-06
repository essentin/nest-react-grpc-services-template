"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ClientIdentityModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIdentityModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_identity_service_1 = require("./client-identity.service");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const lib_sgram_protobuff_1 = require("lib-sgram-protobuff");
let ClientIdentityModule = ClientIdentityModule_1 = class ClientIdentityModule {
    static forRoot(CLIENT_URL, CLIENT_PORT) {
        const grpcClientModule = microservices_1.ClientsModule.register([
            {
                name: lib_sgram_protobuff_1.Identity.IDENTITY_PACKAGE_NAME,
                transport: microservices_1.Transport.GRPC,
                options: {
                    url: `${CLIENT_URL}:${CLIENT_PORT}`,
                    package: lib_sgram_protobuff_1.Identity.IDENTITY_PACKAGE_NAME,
                    protoPath: path_1.join(process.cwd(), '/node_modules/lib-sgram-protobuff/dist/protos/identity.proto'),
                },
            },
        ]);
        return {
            module: ClientIdentityModule_1,
            imports: [grpcClientModule],
            exports: [grpcClientModule],
        };
    }
};
ClientIdentityModule = ClientIdentityModule_1 = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    safe: true,
                    prettyPrint: process.env.NODE_ENV === 'development',
                },
            }),
        ],
        providers: [client_identity_service_1.IdentityClient],
        exports: [client_identity_service_1.IdentityClient],
    })
], ClientIdentityModule);
exports.ClientIdentityModule = ClientIdentityModule;
//# sourceMappingURL=client-identity.module.js.map