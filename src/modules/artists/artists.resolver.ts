import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {ArtistsService} from "./artists.service";
import {BandsService} from "../bands/bands.service";
import {Artist, ArtistInput, Post} from "../../graphql";
import {Headers} from '@nestjs/common';

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
  async artists() {
    return this.artistsService.getAll();
  }

  @ResolveField()
  async bands(@Parent() artist) {
    const bands = await this.bandsService.findByNames(artist.bands);
    //console.log(require('util').inspect(bands, false, null, true))
    return bands;
  }

  @Mutation('createArtist')
  async createArtist(@Args('artist') artist: ArtistInput,  @Context('req') req,): Promise<Artist> {
    const authToken = req.headers.authorization; //Bearer ....
    const response = await this.artistsService.createArtist(artist, authToken);
    return response;
  }
}
