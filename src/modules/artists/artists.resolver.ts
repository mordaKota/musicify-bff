import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ArtistsService} from "./artists.service";
import {BandsService} from "../bands/bands.service";
import {Artist, ArtistInput, DeleteResponse, Post} from "../../graphql";

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
    const bands = await this.bandsService.findByNames(artist.bands);
    //console.log(require('util').inspect(bands, false, null, true))
    return bands;
  }

  @Mutation('createArtist')
  async createArtist(
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
    ): Promise<Artist> {
      const authToken = req.headers.authorization; //Bearer ....
      const response = await this.artistsService.createArtist(artist, authToken);
      return response;
  }

  @Mutation('updateArtist')
  async updateArtist(
    @Args('id') id: string,
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
    ): Promise<Artist> {
      const authToken = req.headers.authorization;
      const response = await this.artistsService.updateArtist(id, artist, authToken);
      return response;
  }

  @Mutation('deleteArtist')
  async deleteArtist(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    const response = await this.artistsService.deleteArtist(id, authToken);
    console.log(response);
    return response;
  }
}
