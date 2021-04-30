import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    }),
    UserModule,
    IdentityModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
