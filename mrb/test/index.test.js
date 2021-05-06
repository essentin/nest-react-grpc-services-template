"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@oclif/test");
const cmd = require("../src");
describe('mrb', () => {
    test_1.test
        .stdout()
        .do(() => cmd.run([]))
        .it('runs hello', ctx => {
        test_1.expect(ctx.stdout).to.contain('hello world');
    });
    test_1.test
        .stdout()
        .do(() => cmd.run(['--name', 'jeff']))
        .it('runs hello --name jeff', ctx => {
        test_1.expect(ctx.stdout).to.contain('hello jeff');
    });
});
//# sourceMappingURL=index.test.js.map