import { join } from 'path';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IdentityClient } from './client-identity.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { Identity } from 'lib-sgram-protobuff';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    }),
  ],
  providers: [IdentityClient],

  exports: [IdentityClient],
})
export class ClientIdentityModule {
  static forRoot(CLIENT_URL, CLIENT_PORT): DynamicModule {
    const grpcClientModule = ClientsModule.register([
      {
        name: Identity.IDENTITY_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${CLIENT_URL}:${CLIENT_PORT}`,
          package: Identity.IDENTITY_PACKAGE_NAME,
          protoPath: join(
            process.cwd(),
            '/node_modules/lib-sgram-protobuff/dist/protos/identity.proto',
          ),
        },
      },
    ]);

    return {
      module: ClientIdentityModule,
      imports: [grpcClientModule],
      exports: [grpcClientModule],
    };
  }
}
