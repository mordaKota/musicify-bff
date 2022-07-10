import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {Credentials, Jwt, User, UserInput} from "../../graphql";

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.getOneById(id);
  }

  @Mutation('register')
  async createUser(@Args('user') user: UserInput): Promise<User> {
    return await this.usersService.register(user);
  }

  @Query('jwt')
  async getJwtToken(@Args('creds') creds: Credentials): Promise<Jwt> {
    return await this.usersService.getJwtToken(creds);
  }
}
