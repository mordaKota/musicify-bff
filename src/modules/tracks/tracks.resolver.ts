import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
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
    return Promise.all(
      (track.bandsIds || []).map(async (band) => {
        return await this.bandService.findOneById(band);
      })
    )
  }

  @ResolveField()
  async genres(@Parent() track) {
    return Promise.all(
      (track.genresIds || []).map(async (genre) => {
        return await this.genresService.findOneById(genre);
      })
    )
  }

  @ResolveField()
  async album(@Parent() track) {
    return await this.albumService.findOneById(track.album);
  }

  @ResolveField()
  async artists(@Parent() track) {
    return Promise.all(
      (track.artistsIds || []).map(async (artist) => {
        return await this.artistService.findOneById(artist);
      })
    )
  }

  @Mutation('createTrack')
  async createTrack(
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    const authToken = req.headers.authorization;
    return await this.tracksService.createTrack(track, authToken);
  }

  @Mutation('updateTrack')
  async updateTrack(
    @Args('id') id: string,
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    const authToken = req.headers.authorization;
    return await this.tracksService.updateTrack(id, track, authToken);
  }

  @Mutation('deleteTrack')
  async deleteTrack(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    return await this.tracksService.deleteTrack(id, authToken);
  }
}
