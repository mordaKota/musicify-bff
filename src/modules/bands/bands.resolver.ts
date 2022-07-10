import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {BandsService} from "./bands.service";
import {ArtistsService} from "../artists/artists.service";
import {GenresService} from "../genres/genres.service";
import {Band, BandInput, DeleteResponse} from "../../graphql";

@Resolver('Band')
export class BandsResolver {
  constructor(
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
    ) {}

  @Query('band')
  async band(@Args('id') id: string) {
    return this.bandsService.findOneById(id);
  }

  @Query('bands')
  async artists(
    @Args('limit') limit: number = 5,
    @Args('offset') offset: number = 0
  ) {
    return this.bandsService.getAll(limit, offset);
  }

  @ResolveField()
  async members (@Parent() band) {
    return Promise.all(
      (band.members || []).map(async (member) => {
        const artist = await this.artistsService.findOneById(member.id);
        return {
          artist: member.id,
          instrument: member.instruments.join(', '),
          years: member.years,
          firstName: artist.firstName,
          lastName: artist.lastName,
        };
      })
    );

  }

  @ResolveField()
  async genres(@Parent() band) {
    return Promise.all(
      (band.genresIds || []).map(async (genre) => {
        return await this.genresService.findOneById(genre);
      })
    )
  }

  @Mutation('createBand')
  async createBand(
    @Args('band') band: BandInput,
    @Context('req') req,
  ): Promise<Band> {
    const authToken = req.headers.authorization;
    return await this.bandsService.createBand(band, authToken);
  }

  @Mutation('updateBand')
  async updateBand(
    @Args('id') id: string,
    @Args('band') band: BandInput,
    @Context('req') req,
  ): Promise<Band> {
    const authToken = req.headers.authorization;
    return await this.bandsService.updateBand(id, band, authToken);
  }

  @Mutation('deleteBand')
  async deleteBand(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const authToken = req.headers.authorization;
    return await this.bandsService.deleteBand(id, authToken);
  }
}
