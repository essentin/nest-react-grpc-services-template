/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./google/protobuf/timestamp";
import { IdParam, EmailParam } from "./common";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "users";

export interface SetParams {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Users {
  data: Users[];
}

export const USERS_PACKAGE_NAME = "users";

export interface UserServiceClient {
  findOne(request: IdParam): Observable<User>;

  getAll(request: Empty): Observable<Users>;

  findByEmail(request: EmailParam): Observable<User>;

  set(request: SetParams): Observable<User>;
}

export interface UserServiceController {
  findOne(request: IdParam): Promise<User> | Observable<User> | User;

  getAll(request: Empty): Promise<Users> | Observable<Users> | Users;

  findByEmail(request: EmailParam): Promise<User> | Observable<User> | User;

  set(request: SetParams): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "getAll", "findByEmail", "set"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
