// add code to read & set any environmental variables w/ dotenv package
require("dotenv").config();
// required to link keys
// sudo npm i axio -g
var fs = require("fs");
var keys = require("./keys");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var request = require("request");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

var findCommand = function(userCommand, commandInfo) {
  switch (userCommand) {
    // command typed by user
    case "spotify-this-song":
      getMeSpotify(commandInfo);
      break;
    case "movie-this":
      findMovie(commandInfo);
      break;
    case "concert-this":
      findBand(commandInfo);
      break;
    case "do-what-it-says":
      console.log("handle do-what-it-says command");
      break;
    default:
      console.log("LIRI doesn't know this command");
  }
};

var findArtists = function(artist) {
  return artist.name;
};

var getMeSpotify = function(songName) {
  if (songName === undefined) {
    songName = "Damn, Not A Thing, Kiddo";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, res) {
      if (err) return;
      // console.log("somethings not right");
      var songs = res.tracks.items;

      for (i = 0; i < songs.length; i++) {
        console.log(i);
        // map thru artist objects
        console.log("artist:" + songs[i].artists.map(findArtists));
        console.log("song:" + songs.map(findArtists));
        // last two arent working
        console.log("preview:" + songs.preview_url.map(findArtists));
        console.log("album:" + songs.album.map(findArtists));
        // TRIALS
        // console.log('song:' + data.songs[i].songName);
        // console.log('preview:' + data.songs[i].artists.preview_url);
        // console.log('album:' + data.songs[i].artists.album.name);
      }
    }
  );
};

var findMovie = function(movieSearch) {
  if (movieSearch === undefined) {
    movieSearch = "mr nobody";
  }

  request(
    "http://www.omdbapi.com/?t=" +
      movieSearch +
      "&y=&plot=full&tomatoes=true&apikey=trilogy",
    function(err, res, body) {
      if (!err && res.statusCode === 200) {
        console.log("* Title of the movie:         " + JSON.parse(body).Title);
        console.log("* Year the movie came out:    " + JSON.parse(body).Year);
        console.log(
          "* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating
        );
        console.log(
          "* Country produced:           " + JSON.parse(body).Country
        );
        console.log(
          "* Language of the movie:      " + JSON.parse(body).Language
        );
        console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
        console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

        // Ratings for loop -- iterate thru all object rating values
        // PARSE = PRIIIINNNTTT ROTTEN TOMATOES [JSON] INFO
        for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
          if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
            console.log(
              "* Rotten Tomatoes Rating:     " +
                JSON.parse(body).Ratings[i].Value
            );
            if (JSON.parse(body).Ratings[i].Website !== undefined) {
              console.log(
                "* Rotten Tomatoes URL:        " +
                  JSON.parse(body).Ratings[i].Website
              );
            }
          }
        }
      }
    }
  );
};

var findBand = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
          show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};



// commands opts for initiation -- "We ARE the initiated, Bruce" - Bane
var runLiri = function(argOne, argTwo) {
  findCommand(argOne, argTwo);
};

// Form Voltron
runLiri(process.argv[2], process.argv.slice(3).join(" "));
