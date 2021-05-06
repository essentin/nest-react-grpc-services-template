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
const lib_client_identity_1 = require("lib-client-identity");
const lib_client_identity_2 = require("lib-client-identity");
const identity_service_1 = require("./identity/identity.service");
const identity_resolver_1 = require("./identity/identity.resolver");
let IdentityModule = class IdentityModule {
};
IdentityModule = __decorate([
    common_1.Module({
        imports: [
            lib_client_identity_1.ClientIdentityModule.forRoot(process.env.SERVICE_IDENTITY_URL, process.env.SERVICE_IDENTITY_PORT),
        ],
        providers: [lib_client_identity_2.IdentityClient, identity_service_1.IdentityService, identity_resolver_1.IdentityResolver],
    })
], IdentityModule);
exports.IdentityModule = IdentityModule;
//# sourceMappingURL=identity.module.js.map