
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AlbumInput {
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<string[]>;
    bands?: Nullable<string[]>;
    tracks?: Nullable<string[]>;
    genres?: Nullable<string[]>;
    image?: Nullable<string>;
}

export class ArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<string[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class BandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<MemberInput>[]>;
    website?: Nullable<string>;
    genres?: Nullable<string[]>;
}

export class MemberInput {
    artist: string;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export class GenreInput {
    name: string;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class TrackInput {
    title: string;
    album?: Nullable<string>;
    artists?: Nullable<string[]>;
    bands?: Nullable<string[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<string[]>;
}

export class UserInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export class Credentials {
    email: string;
    password: string;
}

export class DeleteResponse {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export abstract class IQuery {
    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract artists(limit: number, offset: number): Nullable<Nullable<Artist>[]> | Promise<Nullable<Nullable<Artist>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwt(creds: Credentials): Nullable<Jwt> | Promise<Nullable<Jwt>>;

    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract bands(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Band>[]> | Promise<Nullable<Nullable<Band>[]>>;

    abstract genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract genres(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Genre>[]> | Promise<Nullable<Nullable<Genre>[]>>;

    abstract tracks(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Track>[]> | Promise<Nullable<Nullable<Track>[]>>;

    abstract track(id: string): Nullable<Track> | Promise<Nullable<Track>>;

    abstract albums(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Album>[]> | Promise<Nullable<Nullable<Album>[]>>;

    abstract album(id: string): Nullable<Album> | Promise<Nullable<Album>>;
}

export abstract class IMutation {
    abstract createArtist(artist?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract updateArtist(id: string, artist?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract deleteArtist(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;

    abstract register(user?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createBand(band?: Nullable<BandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract updateBand(id: string, band?: Nullable<BandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract deleteBand(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;

    abstract createGenre(genre?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract updateGenre(id: string, genre?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract deleteGenre(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;

    abstract createTrack(track?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;

    abstract updateTrack(id: string, track?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;

    abstract deleteTrack(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;

    abstract createAlbum(album?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;

    abstract updateAlbum(id: string, album?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;

    abstract deleteAlbum(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;
}

export class Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    image?: Nullable<string>;
}

export class Artist {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class Member {
    artist: string;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Favourites {
    id: string;
    userId?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    artists?: Nullable<Nullable<Artist>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
}

export class Genre {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class Track {
    id: string;
    title: string;
    album?: Nullable<Album>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class User {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
}

export class Jwt {
    jwt: string;
}

type Nullable<T> = T | null;
