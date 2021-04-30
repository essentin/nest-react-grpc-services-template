import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import { IdentityClient } from 'lib-client-identity';
import { UserModel } from './user.model';

@Resolver()
export class UserResolver {
  constructor(
    private identityClient: IdentityClient,
    private readonly logger: PinoLogger,
  ) {}

  @Query((returns) => UserModel)
  async users(@Args('id', { type: () => Int }) id: number) {
    const value = await this.identityClient.login({email: "bka"}).toPromise()
    this.logger.warn(value);
    return {
      id:12,
      firstName: "John DOe"
    };
  }
}

// @Resolver(of => Author)
// export class AuthorsResolver {
//   constructor(
//     private authorsService: AuthorsService,
//     private postsService: PostsService,
//   ) {}

//   @Query(returns => Author)
//   async author(@Args('id', { type: () => Int }) id: number) {
//     return this.authorsService.findOneById(id);
//   }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
// }
