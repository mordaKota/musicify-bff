import {forwardRef, Module} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';
import {HttpModule} from "@nestjs/axios";
import {BandsModule} from "../bands/bands.module";
import {GenresModule} from "../genres/genres.module";
import {ArtistsModule} from "../artists/artists.module";
import {AlbumsModule} from "../albums/albums.module";

@Module({
  imports: [HttpModule, BandsModule, GenresModule, ArtistsModule, forwardRef(() => AlbumsModule)],
  providers: [TracksService, TracksResolver],
  exports: [TracksService]
})
export class TracksModule {}
