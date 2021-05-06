import { PinoLogger } from 'nestjs-pino';
import { IdentityClient } from 'lib-client-identity';
export declare class UserResolver {
    private identityClient;
    private readonly logger;
    constructor(identityClient: IdentityClient, logger: PinoLogger);
    users(id: number): Promise<{
        id: number;
        firstName: string;
    }>;
}
