"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityClient = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const lib_sgram_protobuff_1 = require("lib-sgram-protobuff");
let IdentityClient = class IdentityClient {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
    }
    onModuleInit() {
        this.service = this.client.getService(lib_sgram_protobuff_1.Identity.IDENTITY_SERVICE_NAME);
    }
    login(request) {
        throw new Error('Method not implemented.');
    }
    authenticate(request) {
        throw new Error('Method not implemented.');
    }
};
IdentityClient = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(lib_sgram_protobuff_1.Identity.IDENTITY_PACKAGE_NAME)),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.PinoLogger])
], IdentityClient);
exports.IdentityClient = IdentityClient;
//# sourceMappingURL=client-identity.service.js.map