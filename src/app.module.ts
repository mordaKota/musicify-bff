import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import {ArtistsModule} from "./modules/artists/artists.module";
import {AlbumsModule} from "./modules/albums/albums.module";
import {BandsModule} from "./modules/bands/bands.module";
import {FavouritesModule} from "./modules/favourites/favourites.module";
import {GenresModule} from "./modules/genres/genres.module";
import {TracksModule} from "./modules/tracks/tracks.module";
import {UsersModule} from "./modules/users/users.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
    }),
    AuthorsModule,
    ArtistsModule,
    AlbumsModule,
    BandsModule,
    FavouritesModule,
    GenresModule,
    TracksModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
