import { Module } from '@nestjs/common';
import { ClientIdentityModule } from 'lib-client-identity';
import { IdentityClient } from 'lib-client-identity';
import { UserResolver } from './user.resolver';
 
@Module({
  imports: [
    ClientIdentityModule.forRoot(
      process.env.SERVICE_IDENTITY_URL,
      process.env.SERVICE_IDENTITY_PORT,
    ),
  ],
  providers: [UserResolver, IdentityClient],
})
export class UserModule {}
