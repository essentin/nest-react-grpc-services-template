import { Controller, Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Identity, Common } from 'lib-sgram-protobuff';
import { Observable } from 'rxjs';
import { TokenGenerator } from './types';

@Controller()
// Generated decorator that applies all the @GrpcMethod and @GrpcStreamMethod to the right methods
@Identity.IdentityServiceControllerMethods()
export class IdentityController implements Identity.IdentityServiceController {
  private tokenGenerator : TokenGenerator;
  constructor(
    private readonly logger: PinoLogger,
    @Inject('TokenGenerator') tokenGeneratorFactory,
    @Inject('uuid') private readonly uuid,
  ) {
    logger.setContext(IdentityController.name);
    logger.info('IdentityController.Ready');

    this.tokenGenerator = new tokenGeneratorFactory(256, tokenGeneratorFactory.BASE62);
    logger.info(this.tokenGenerator.generate());
    logger.info(uuid.v4());
  }

  login(request: Common.EmailParam): Observable<Identity.Jwt> {
    throw Error('Not Implemented');
  }

  authenticate(request: Identity.TokenParam): Observable<Identity.Jwt> {
    throw Error('Not Implemented');
  }
}
