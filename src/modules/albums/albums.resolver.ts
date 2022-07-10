import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {TracksService} from "../tracks/tracks.service";
import {BandsService} from "../bands/bands.service";
import {GenresService} from "../genres/genres.service";
import {ArtistsService} from "../artists/artists.service";
import {AlbumsService} from "./albums.service";
import {Album, AlbumInput, DeleteResponse} from "../../graphql";

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private tracksService: TracksService,
    private bandService: BandsService,
    private genresService: GenresService,
    private artistService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  @Query('album')
  async album(@Args('id') id: string) {
    return this.albumsService.findOneById(id);
  }

  @Query('albums')
  async albums(
    @Args('limit') limit: number = 5,
    @Args('offset') offset: number = 0
  ) {
    return this.albumsService.getAll(limit, offset);
  }

  @ResolveField()
  async bands(@Parent() album) {
    return Promise.all(
      (album.bandsIds || []).map(async (band) => {
        return await this.bandService.findOneById(band);
      })
    )
  }

  @ResolveField()
  async genres(@Parent() album) {
    return Promise.all(
      (album.genresIds || []).map(async (genre) => {
        return await this.genresService.findOneById(genre);
      })
    )
  }

  @ResolveField()
  async tracks(@Parent() album) {
    return Promise.all(
      (album.tracksIds || []).map(async (track) => {
        return await this.tracksService.findOneById(track);
      })
    )
  }

  @ResolveField()
  async artists(@Parent() track) {
    return Promise.all(
      (track.artistsIds || []).map(async (artist) => {
        return await this.artistService.findOneById(artist);
      })
    )
  }

  @Mutation('createAlbum')
  async createAlbum(
    @Args('album') album: AlbumInput,
    @Context('req') req,
  ): Promise<Album> {
    const authToken = req.headers.authorization;
    return await this.albumsService.createAlbum(album, authToken);
  }

  @Mutation('updateAlbum')
  async updateAlbum(
    @Args('id') id: string,
    @Args('album') album: AlbumInput,
    @Context('req') req,
  ): Promise<Album> {
    const authToken = req.headers.authorization;
    return await this.albumsService.updateAlbum(id, album, authToken);
  }

  @Mutation('deleteAlbum')
  async deleteAlbum(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    return await this.albumsService.deleteAlbum(id, authToken);
  }
}
