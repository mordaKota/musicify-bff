import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {GenresService} from "./genres.service";
import {DeleteResponse, Genre, GenreInput} from "../../graphql";

@Resolver('Genre')
export class GenresResolver {
  constructor(
    private readonly genresService: GenresService,
  ) {}

  @Query('genre')
  async genre(@Args('id') id: string) {
    return this.genresService.findOneById(id);
  }

  @Query('genres')
  async genres(
    @Args('limit') limit: number = 5,
    @Args('offset') offset: number = 0
  ) {
    return this.genresService.getAll(limit, offset);
  }

  @Mutation('createGenre')
  async createGenre(
    @Args('genre') genre: GenreInput,
    @Context('req') req,
  ): Promise<Genre> {
    const authToken = req.headers.authorization; //Bearer ....
    const response = await this.genresService.createGenre(genre, authToken);
    return response;
  }

  @Mutation('updateGenre')
  async updateGenre(
    @Args('id') id: string,
    @Args('genre') genre: GenreInput,
    @Context('req') req,
  ): Promise<Genre> {
    const authToken = req.headers.authorization;
    const response = await this.genresService.updateGenre(id, genre, authToken);
    return response;
  }

  @Mutation('deleteGenre')
  async deleteGenre(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    const response = await this.genresService.deleteGenre(id, authToken);
    console.log(response);
    return response;
  }

}
