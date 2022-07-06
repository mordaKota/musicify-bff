import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {Credentials, Jwt, User, UserInput} from "../../graphql";

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async user(@Args('id') id: string): Promise<User> {
    const response = this.usersService.getOneById(id);
    return response;
  }

  @Mutation('register')
  async createUser(@Args('user') user: UserInput): Promise<User> {
    const response = await this.usersService.register(user);
    return response;
  }

  @Query('jwt')
  async getJwtToken(@Args('creds') creds: Credentials): Promise<Jwt> {
    const response = await this.usersService.getJwtToken(creds);
    return response;
  }
}
