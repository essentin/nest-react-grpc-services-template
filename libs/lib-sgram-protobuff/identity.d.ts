import { Observable } from 'rxjs';
import { EmailParam } from './common';
export declare const protobufPackage = "identity";
export interface TokenParam {
    authToken: string;
}
export interface Jwt {
    jwt: string;
}
export declare const IDENTITY_PACKAGE_NAME = "identity";
export interface IdentityServiceClient {
    login(request: EmailParam): Observable<Jwt>;
    authenticate(request: TokenParam): Observable<Jwt>;
}
export interface IdentityServiceController {
    login(request: EmailParam): Observable<Jwt>;
    authenticate(request: TokenParam): Observable<Jwt>;
}
export declare function IdentityServiceControllerMethods(): (constructor: Function) => void;
export declare const IDENTITY_SERVICE_NAME = "IdentityService";
