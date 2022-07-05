import {Args, Query, Resolver} from '@nestjs/graphql';
import {ArtistsService} from "./artists.service";

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
  ) {}

  @Query()
  async artist(@Args('id') id: string) {
    return this.artistsService.findOneById(id);
  }
}
