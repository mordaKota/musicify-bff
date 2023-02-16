import {forwardRef, Module} from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import {HttpModule} from "@nestjs/axios";
import {BandsModule} from "../bands/bands.module";
import {BandsService} from "../bands/bands.service";

@Module({
  imports: [HttpModule, forwardRef(() => BandsModule)],
  providers: [ArtistsResolver, ArtistsService],
  exports: [ArtistsService]
})
export class ArtistsModule {}
