import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import {HttpModule} from "@nestjs/axios";
import {BandsModule} from "../bands/bands.module";

@Module({
  imports: [HttpModule, BandsModule],
  providers: [ArtistsResolver, ArtistsService]
})
export class ArtistsModule {}
