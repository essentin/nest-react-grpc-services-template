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
var IdentityController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const lib_sgram_protobuff_1 = require("lib-sgram-protobuff");
let IdentityController = IdentityController_1 = class IdentityController {
    constructor(logger, tokenGeneratorFactory, uuid) {
        this.logger = logger;
        this.uuid = uuid;
        logger.setContext(IdentityController_1.name);
        logger.info('IdentityController.Ready');
        this.tokenGenerator = new tokenGeneratorFactory(256, tokenGeneratorFactory.BASE62);
        logger.info(this.tokenGenerator.generate());
        logger.info(uuid.v4());
    }
    login(request) {
        throw Error('Not Implemented');
    }
    authenticate(request) {
        throw Error('Not Implemented');
    }
};
IdentityController = IdentityController_1 = __decorate([
    common_1.Controller(),
    lib_sgram_protobuff_1.Identity.IdentityServiceControllerMethods(),
    __param(1, common_1.Inject('TokenGenerator')),
    __param(2, common_1.Inject('uuid')),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger, Object, Object])
], IdentityController);
exports.IdentityController = IdentityController;
//# sourceMappingURL=Identity.controller.js.map