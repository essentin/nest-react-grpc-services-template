import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { Identity, Common } from 'lib-sgram-protobuff';

@Injectable()
export class IdentityClient
  implements OnModuleInit, Identity.IdentityServiceClient {
  service: Identity.IdentityServiceClient;

  constructor(
    @Inject(Identity.IDENTITY_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly logger: PinoLogger,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<Identity.IdentityServiceClient>(
      Identity.IDENTITY_SERVICE_NAME,
    );
  }

  login(request: Common.EmailParam): Observable<Identity.Jwt> {
    throw new Error('Method not implemented.');
  }

  authenticate(request: Identity.TokenParam): Observable<Identity.Jwt> {
    throw new Error('Method not implemented.');
  }
}
