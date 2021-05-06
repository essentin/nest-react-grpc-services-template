"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const identity_module_1 = require("./identity.module");
const path_1 = require("path");
const nestjs_pino_1 = require("nestjs-pino");
const lib_sgram_protobuff_1 = require("lib-sgram-protobuff");
require("/node_modules/lib-sgram-protobuff/dist/protos/identity.proto");
require("/node_modules/lib-sgram-protobuff/dist/protos/common.proto");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(identity_module_1.IdentityModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            url: `${process.env.URL}:${process.env.PORT}`,
            package: lib_sgram_protobuff_1.Identity.IDENTITY_PACKAGE_NAME,
            protoPath: path_1.join(__dirname, './identity.proto'),
            loader: {
                enums: String,
                objects: true,
                arrays: true,
            },
        },
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    return app.listenAsync();
}
bootstrap();
//# sourceMappingURL=main.js.map