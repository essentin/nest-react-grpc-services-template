import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));
  app.use(bodyParser.json());
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT);
}

bootstrap();
