import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IdentityModule } from './identity.module';
import { join } from 'path';

import { Logger } from 'nestjs-pino';

import { Identity } from 'lib-sgram-protobuff';

 import '/node_modules/lib-sgram-protobuff/dist/protos/identity.proto';
 import '/node_modules/lib-sgram-protobuff/dist/protos/common.proto';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IdentityModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: Identity.IDENTITY_PACKAGE_NAME,
        protoPath: join(__dirname, './identity.proto'),
        loader: {
          enums: String,
          objects: true,
          arrays: true,
        },
      },
    },
  );

  app.useLogger(app.get(Logger));

  return app.listenAsync();
}

bootstrap();
