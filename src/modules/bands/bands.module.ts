import {forwardRef, Module} from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import {HttpModule} from "@nestjs/axios";
import {ArtistsModule} from "../artists/artists.module";
import {GenresModule} from "../genres/genres.module";

@Module({
  imports: [HttpModule, forwardRef(() => ArtistsModule), GenresModule],
  providers: [BandsService, BandsResolver],
  exports: [BandsService]
})
export class BandsModule {}
