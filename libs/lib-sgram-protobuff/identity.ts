/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { EmailParam } from './common';

export const protobufPackage = 'identity';

export interface TokenParam {
  authToken: string;
}

export interface Jwt {
  jwt: string;
}

export const IDENTITY_PACKAGE_NAME = 'identity';

export interface IdentityServiceClient {
  login(request: EmailParam): Observable<Jwt>;

  authenticate(request: TokenParam): Observable<Jwt>;
}

export interface IdentityServiceController {
  login(request: EmailParam): Observable<Jwt>;

  authenticate(request: TokenParam): Observable<Jwt>;
}

export function IdentityServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['login', 'authenticate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const IDENTITY_SERVICE_NAME = 'IdentityService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
