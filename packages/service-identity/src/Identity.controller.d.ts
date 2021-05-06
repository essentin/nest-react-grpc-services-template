import { PinoLogger } from 'nestjs-pino';
import { Identity, Common } from 'lib-sgram-protobuff';
import { Observable } from 'rxjs';
export declare class IdentityController implements Identity.IdentityServiceController {
    private readonly logger;
    private readonly uuid;
    private tokenGenerator;
    constructor(logger: PinoLogger, tokenGeneratorFactory: any, uuid: any);
    login(request: Common.EmailParam): Observable<Identity.Jwt>;
    authenticate(request: Identity.TokenParam): Observable<Identity.Jwt>;
}
