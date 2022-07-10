import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
//import {Artist, ArtistInput, DeleteResponse, Track, TrackInput} from "../../graphql";
import {TracksService} from "./tracks.service";
import {BandsService} from "../bands/bands.service";
import {GenresService} from "../genres/genres.service";
import {ArtistsService} from "../artists/artists.service";
import {AlbumsService} from "../albums/albums.service";
import {DeleteResponse, Track, TrackInput} from "../../graphql";

@Resolver('Track')
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private bandService: BandsService,
    private genresService: GenresService,
    private artistService: ArtistsService,
    private albumService: AlbumsService,
  ) {}

  @Query('track')
  async track(@Args('id') id: string) {
    console.log ( {key: await this.tracksService.findOneById(id)});
    return this.tracksService.findOneById(id);
  }

  @Query('tracks')
  async tracks(
    @Args('limit') limit: number = 5,
    @Args('offset') offset: number = 0
  ) {
    return this.tracksService.getAll(limit, offset);
  }

  @ResolveField()
  async bands(@Parent() track) {
    console.log({ track });
    return Promise.all(
      (track.bandsIds || []).map(async (band) => {
        console.log(track);
        const response = await this.bandService.findOneById(band)
        return response;
      })
    )
  }

  @ResolveField()
  async genres(@Parent() track) {
    return Promise.all(
      (track.genresIds || []).map(async (genre) => {
        const response = await this.genresService.findOneById(genre);
        return response;
      })
    )
  }

  // @ResolveField()
  // async albums(@Parent() track) {
  //   return Promise.all(
  //     (track.albums || []).map(async (album) => {
  //       const response = await this.albumService.findOneById(album)
  //       return response;
  //     })
  //   )
  // }

  @ResolveField()
  async artists(@Parent() track) {
    return Promise.all(
      (track.artistsIds || []).map(async (artist) => {
        const response = await this.artistService.findOneById(artist)
        return response;
      })
    )
  }

  @Mutation('createTrack')
  async createTrack(
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    const authToken = req.headers.authorization;
    const response = await this.tracksService.createTrack(track, authToken);
    return response;
  }

  @Mutation('updateTrack')
  async updateTrack(
    @Args('id') id: string,
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    const authToken = req.headers.authorization;
    const response = await this.tracksService.updateArtist(id, track, authToken);
    return response;
  }

  @Mutation('deleteTrack')
  async deleteTrack(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    const response = await this.tracksService.deleteArtist(id, authToken);
    console.log(response);
    return response;
  }
}
