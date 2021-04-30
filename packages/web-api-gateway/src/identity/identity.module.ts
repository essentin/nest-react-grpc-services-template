import { Module } from '@nestjs/common';
import { ClientIdentityModule } from 'lib-client-identity';
import { IdentityClient } from 'lib-client-identity';
import { IdentityService } from './identity/identity.service';
import { IdentityResolver } from './identity/identity.resolver';

@Module({
  imports: [
    ClientIdentityModule.forRoot(
      process.env.SERVICE_IDENTITY_URL,
      process.env.SERVICE_IDENTITY_PORT,
    ),
  ],
  providers: [IdentityClient, IdentityService, IdentityResolver],
})
export class IdentityModule {}
