"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const identity_resolver_1 = require("./identity.resolver");
describe('IdentityResolver', () => {
    let resolver;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [identity_resolver_1.IdentityResolver],
        }).compile();
        resolver = module.get(identity_resolver_1.IdentityResolver);
    });
    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
//# sourceMappingURL=identity.resolver.spec.js.map