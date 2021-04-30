import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

import { IdentityController } from './Identity.controller';

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
  providers: [
    {
      provide: 'TokenGenerator',
      useValue: require('uuid-token-generator'),
    },
    {
      provide: 'uuid',
      useValue: require('uuid'),
    },
  ],
  controllers: [IdentityController],
})
export class IdentityModule {}
