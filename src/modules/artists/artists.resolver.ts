import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ArtistsService} from "./artists.service";
import {BandsService} from "../bands/bands.service";
import {Artist, ArtistInput, DeleteResponse} from "../../graphql";

@Resolver('Artist')

export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {}

  @Query('artist')
  async artist(@Args('id') id: string) {
    return this.artistsService.findOneById(id);
  }

  @Query('artists')
  async artists(
    @Args('limit') limit: number = 5,
    @Args('offset') offset: number = 0
  ) {
    return this.artistsService.getAll(limit, offset);
  }

  @ResolveField()
  async bands(@Parent() artist) {
   // const bands = await this.bandsService.findByNames(artist.bands);
    return Promise.all(
      (artist.bandsIds || []).map(async (band) => {
        return await this.bandsService.findOneById(band);
      })
    )
  }

  @Mutation('createArtist')
  async createArtist(
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
    ): Promise<Artist> {
      const authToken = req.headers.authorization; //Bearer ....
      return await this.artistsService.createArtist(artist, authToken);
  }

  @Mutation('updateArtist')
  async updateArtist(
    @Args('id') id: string,
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
    ): Promise<Artist> {
      const authToken = req.headers.authorization;
      return await this.artistsService.updateArtist(id, artist, authToken);
  }

  @Mutation('deleteArtist')
  async deleteArtist(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    return await this.artistsService.deleteArtist(id, authToken);
  }
}
