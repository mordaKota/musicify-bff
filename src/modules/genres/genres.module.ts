import {Module} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import {HttpModule} from "@nestjs/axios";


@Module({
  imports: [HttpModule],
  providers: [GenresService, GenresResolver],
  exports: [GenresService]
})
export class GenresModule {}
