import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {AuthorsService} from "./authors.service";


@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    // private postsService: PostsService,
  ) {}

  @Query()
  async author(@Args('id') id: number) {
    console.log("here");
    //return this.authorsService.findOneById(id);
    return {
      id: 1,
      firstName: 'morda',
      lastName: 'mordamorda'
    }
  }

  @ResolveField()
  async posts(@Parent() author) {
    const {id} = author;
    return [{
      id: 22,
      title: 'title1',
      votes: 3
      //return this.postsService.findAll({ authorId: id });
    }]
  }
}