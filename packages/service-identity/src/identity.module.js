"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const Identity_controller_1 = require("./Identity.controller");
let IdentityModule = class IdentityModule {
};
IdentityModule = __decorate([
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
        providers: [
            {
                provide: 'TokenGenerator',
                useValue: require('uuid-token-generator'),
            },
            {
                provide: 'uuid',
                useValue: require('uuid'),
            },
        ],
        controllers: [Identity_controller_1.IdentityController],
    })
], IdentityModule);
exports.IdentityModule = IdentityModule;
//# sourceMappingURL=identity.module.js.map