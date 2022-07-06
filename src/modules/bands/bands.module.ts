import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [BandsService, BandsResolver],
  exports: [BandsService]
})
export class BandsModule {}
