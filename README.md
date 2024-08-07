#### BatServer

A simple server for the BAT project.

##### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

##### Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/Pizzaboi87/batserver.git
cd batserver
npm install
```

##### Usage

First, ensure you have a `.env` file in the root of the project with the necessary environment variables (see [Environment Variables](#environment-variables) section).

To start the server locally:

```sh
node api/index.js
```

The server should now be running on `http://localhost:3000`.

##### Endpoints

###### GET /

Returns a simple message indicating the server is running.

**Request:**

```sh
GET /
```

**Response:**

```json
{
  "message": "ok"
}
```

###### GET /movies

Returns a list of Batman movies from the database.

**Request:**

```sh
GET /movies
```

**Response:**

```json
[
  {
    "title": "Batman",
    "shown": "1943",
    "runtime": 260,
    "director": "Lambert Hillyer",
    "actors": "Lewis Wilson, Douglas Croft, J. Carrol Naish",
    "plot": "Japanese spymaster Prince Daka operates a covert espionage organization located in Gotham City's now-deserted Little Tokyo which turns American scientists into pliable zombies.",
    "poster": "https://peterweiser.com/batmovie/tt0035665.webp",
    "imdbRating": 6.1,
    "imdbID": "tt0035665",
    "filmType": "movie"
  },
  ...
]
```

###### GET /games

Returns a list of Batman games from the database.

**Request:**

```sh
GET /games
```

**Response:**

```json
[
  {
    "title": "Batman",
    "developer": "Ocean Software",
    "publisher": "Ocean Software",
    "releaseDate": 1986,
    "platform": "amstrad_cpc,amstrad_pcw,msx,zx_spectrum",
    "youTube": "xQFeb_6SRdM",
    "details": "Batman is a 1986 3D isometric action-adventure game by Ocean Software, and the first Batman game developed. The object of the game is to rescue Robin by collecting the seven parts of the Batcraft hovercraft that are scattered around the Batcave. The gameplay takes place in a 3D isometric universe, which programmer Jon Ritman and artist Bernie Drummond would further develop for 1987's Head Over Heels, and is notable for implementing an early example of a save game system that allows players to restart from an intermediate point in the game on the loss of all lives rather than returning all the way to the start (in this case the point at which Batman collects a Batstone).",
    "logo1": "https://peterweiser.com/logo/amstrad_cpc.webp",
    "logo1_title": "Amstrad CPC",
    "logo1_wiki": "https://en.wikipedia.org/wiki/Amstrad_CPC",
    "logo2": "https://peterweiser.com/logo/amstrad_pcw.webp",
    "logo2_title": "Amstrad PCW",
    "logo2_wiki": "https://en.wikipedia.org/wiki/Amstrad_PCW",
    "logo3": "https://peterweiser.com/logo/msx.webp",
    "logo3_title": "MSX",
    "logo3_wiki": "https://en.wikipedia.org/wiki/MSX",
    "logo4": "https://peterweiser.com/logo/zx_spectrum.webp",
    "logo4_title": "ZX Spectrum",
    "logo4_wiki": "https://en.wikipedia.org/wiki/ZX_Spectrum",
    "logo5": "",
    "logo5_title": "",
    "logo5_wiki": "",
    "logo6": "",
    "logo6_title": "",
    "logo6_wiki": ""
  },
  ...
]
```

###### GET /comicvine/:type/:character/:filter

Fetches data from the ComicVine API based on the specified type, character, and filter.

**Request:**

```sh
GET /comicvine/:type/:character/:filter
```

**Response:**

The response will vary based on the ComicVine API data.

##### Environment Variables

Ensure you have a `.env` file in the root of the project with the following variables:

```
API_KEY=your_comicvine_api_key
API_URL=ComicVine API url
API_HOST=your_database_host
API_USER=your_database_user
API_PASSWORD=your_database_password
API_DATABASE=your_database_name
```

##### License

This project is licensed under the ISC License.

```

Create the `.env` file with the necessary environment variables as described, and you should be able to run the application using the `node api/index.js` command. Use a browser or an API client tool like Postman to check the endpoints.

Make sure to add a `.gitignore` file to prevent sensitive information from being committed to version control:

**.gitignore**:
```

node_modules
.env

```

If you have any questions or need further assistance, feel free to ask.
```
