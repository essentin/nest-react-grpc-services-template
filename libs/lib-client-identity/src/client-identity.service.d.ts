import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { Identity, Common } from 'lib-sgram-protobuff';
export declare class IdentityClient implements OnModuleInit, Identity.IdentityServiceClient {
    private readonly client;
    private readonly logger;
    service: Identity.IdentityServiceClient;
    constructor(client: ClientGrpc, logger: PinoLogger);
    onModuleInit(): void;
    login(request: Common.EmailParam): Observable<Identity.Jwt>;
    authenticate(request: Identity.TokenParam): Observable<Identity.Jwt>;
}
