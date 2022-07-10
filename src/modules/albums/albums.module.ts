import {forwardRef, Module} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import {HttpModule} from "@nestjs/axios";
import {BandsModule} from "../bands/bands.module";
import {GenresModule} from "../genres/genres.module";
import {ArtistsModule} from "../artists/artists.module";
import {TracksModule} from "../tracks/tracks.module";

@Module({
  imports: [HttpModule, BandsModule, GenresModule, ArtistsModule, forwardRef(() => TracksModule)],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService]
})
export class AlbumsModule {}
