"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const nestjs_pino_1 = require("nestjs-pino");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.use(bodyParser.json());
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map