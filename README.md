<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
|Task|https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md|
|---|---|
|Score|https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/score.md|
## Installation

1. Clone, install: https://github.com/rolling-scopes-school/node-graphql-service
2. Install/setup MongoDB and run the server
3. Change .env with your MongoDB server (for example, MONGO_URL=mongodb://localhost:27017 if you run the on-premises version and start the default server). Run microservices apps after changing .env.
4. Clone and install the musicify-bff app with 
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

Open http://127.0.0.1:3000/graphql and start testing the app:

**NOTICE: If you want to use mutations, you need to register and get jwt token to use it as HTTP HEADER in the graphql playground.**

_Examples of queries:_ 

ARTISTS
```graphql
query getArtist{
    artist(id:"62c447794fddfc76eb2181d3"){
        firstName
        instruments
        country
        bands {
            name
        }
    }
}

query getAll{
    artists(limit: 3, offset: 0){
        firstName
        secondName
        instruments
        bands {
            name
        }
    }
}

mutation createArtist{
    createArtist(artist: {
        firstName: "Test Name",
        secondName: "Test Surname"
        country: "Cyprus",
        instruments: ["drums"]
    }) {
        id
        firstName
    }
}

mutation updateArtist{
    updateArtist(artist: {
        firstName: "Test Name2",
        secondName: "Test Surname2"
        country: "d",
        instruments: ["guitar"],
        bands: "62cac8229aee90a40e7339ac"
    }, id: "62cb154449d00ca367eda10a") {
        id
        firstName
        bands { name }
    }
}
mutation deleteArtist{
    deleteArtist(id: "62c6e34b4fddfc76eb218209") {
        deletedCount
    }
}
```
USERS

```graphql
query getUser{
  user(id: "62c58a4905866487e04038d9") {
    id
    firstName
  }
}

query getJwt{
  jwt(creds: {
    email: "sobaka@gmail.com",
    password: "12345678"
  }) {
    jwt
  }
}

mutation registerUser{
  register(user: {
    firstName: "Sobaka", 
  	lastName: "Bezimeni",
    password: "12345678",
    email: "sobaka@gmail.com"
  }) {
    id
    firstName
  }
}
```

BANDS

```graphql
query getBand{
    band(id:"62cac8229aee90a40e7339ac"){
        name
        website
        members {
            instrument
            firstName
        }
        genres {
            name
        }
    }
}

query getAllBands{
    bands(limit: 3, offset: 0){
        name
        website
        members {
            instrument
        }
        genres {
            id
        }
    }
}

mutation createBand{
    createBand(band: {
        name: "TestBand",
        website: "test@website.com",
        genres: ["62c4633edfd0b35efa27fdf7", "62c46349dfd0b35efa27fdf9"],
        members:[
            {
                artist: "62c429604fddfc76eb21819c"
            }

        ]
    }) {
        id
        name
    }
}

mutation updateBand{
    updateBand(band: {
        name: "TestBand2",
        website: "test@website.com",
    },  id: "62cad4119aee90a40e7339c4") {
        id
        name
    }
}

mutation deleteBand{
    deleteBand(id: "62c6e34b4fddfc76eb218209") {
        deletedCount
    }
}
```

GENRES
```graphql
query getGenre{
  genre(id:"62c4633edfd0b35efa27fdf7"){
    name
    description
    country
    year
  }
}

query getGenres{
    genres{
        name
        description
        country
        year
    }
}

mutation createGenre{
    createGenre(genre: {
        name: "Russian Rock",
        description: "Shitrock",
        country: "Russia",
        year: 1970
    }) {
        id
        name
    }
}

mutation updateGenre{
    updateGenre(genre: {
        name: "Russian Rock",
        description: "Norm rock",
    }, id: "62cae564dfd0b35efa27fe07") {
        id
        name
    }
}

mutation deleteGenre{
    deleteGenre(id: "62cae564dfd0b35efa27fe07") {
        deletedCount
    }
}
```

TRACKS
```graphql
query getTrack{
  track(id: "62cafb8e4876c3b24fcb2fca") {
    id
    title
    bands {
      name
    }
    genres {
      name
    }
    artists {
      firstName
    }
  }
}

mutation createTrack{
    createTrack(track: {
        title: "One Song",
        duration: 154,
        artists: ["62c429604fddfc76eb21819c"],
        bands: ["62c464e49aee90a40e73395f"],
        genres: ["62c4633edfd0b35efa27fdf7", "62c46349dfd0b35efa27fdf9"],
        album: "62cb0d35f9e50fe79f69fd15"
    }) {
        id
        title

    }
}

mutation updateTrack{
    updateTrack(track: {
        title: "Super Song2",
    }, id: "62cafb8e4876c3b24fcb2fca") {
        title
        artists{
            firstName
        }
    }
}

```

ALBUMS
```graphql
mutation createAlbum{
    createAlbum(album: {
        name: "Test Album",
        released: 1974,
        image: "image.png",
        genres: ["62c4633edfd0b35efa27fdf7", "62c46349dfd0b35efa27fdf9"],
        artists: ["62c429604fddfc76eb21819c"],
        tracks: ["62cafb8e4876c3b24fcb2fca"],
        bands: ["62c716a89aee90a40e73398f"]
    }) {
        id
        name
        artists {
            firstName
        }
        bands {
            name
        }
        genres {
            name
        }
    }
}

mutation updateAlbum{
    updateAlbum(album: {
        name: "Test Album2",
        image: "1.png",
    }, id: "62cb226af9e50fe79f69fd2f") {
        id
        name
        artists {
            firstName
        }
        bands {
            name
        }
        genres {
            name
        }
    }
}
```
## License

Nest is [MIT licensed](LICENSE).
