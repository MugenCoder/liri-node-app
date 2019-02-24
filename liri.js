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

var findArtists = function(artist) {
  return artist.name;
}

// Gift from Rachel: let's get your app running
var getMeSpotify = function(songName) {
  // todo: write your spotify api call logic here
  if (songName === undefined) {
    songName = 'Damn, Not A Thing, Kiddo';
  }

  spotify.search({ 
    type: 'track',
    query: songName 
  },
    function(err, res) {
    if (err) return;
    // console.log("somethings not right");
    var songs = res.tracks.items;

  for(i=0; i < songs.length; i++) {
    console.log(i);
     // map thru artist objects
    console.log('artist:' + songs[i].artists.map(findArtists));
    console.log('song:' + songs.map(findArtists));
    // last two arent working
    console.log('preview:' + songs.preview_url.map(findArtists));
    console.log('album:' + songs.album.map(findArtists));
    // TRIALS
    // console.log('song:' + data.songs[i].songName);
    // console.log('preview:' + data.songs[i].artists.preview_url);
    // console.log('album:' + data.songs[i].artists.album.name);
  }
  })
}

var findCommand = function(caseData, functionData) {
  switch (caseData) {
    // command typed by user
    case "spotify-this-song":
      // name of function to handle spotify command
      getMeSpotify(functionData);
      break;
    default:
      console.log("LIRI doesn't know that song");
  }
};

// var movieSearch = new Movie();
var findMovie = function(caseData,functionData) {
  switch (caseData) {
    case 'movie-this':
    movieSearch(functionData);
    break;
    default:
      console.log("LIRI can't watch that movie");
  }
};

  // TRIALS/WORKING OPT 
  // var findMovie = function(movieSearch) {
  //   return movieSearch.name;
  // }
    if(findMovie === undefined){
      findMovie = "mr nobody";
    }

// HTTP GET request
request("http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&r=json", function(err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log("* Title of the movie:         " + JSON.parse(body).Title);
    console.log("* Year the movie came out:    " + JSON.parse(body).Year);
    console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
    console.log("* Country produced:           " + JSON.parse(body).Country);
    console.log("* Language of the movie:      " + JSON.parse(body).Language);
    console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
    console.log("* Actors in the movie:        " + JSON.parse(body).Actors);


      // Ratings for loop -- iterate thru all object rating values
      // PARSE = PRIIIINNNTTT ROTTEN TOMATOES [JSON] INFO
	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
	  }
  });
  
  var findBand = function(caseData,functionData) {
    switch (caseData) {
      case 'concert-this':
      movieSearch(functionData);
      break;
      default:
        console.log("LIRI can't watch that band");
    }
  };

  get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"){ 
  if (!err) {
    console.log("* Name of the venue:         " + JSON.parse(body).venue);
    console.log("* Venue location:    " + JSON.parse(body).venueLocaction);
    console.log("* Date of the Event:   " + JSON.parse(moment()).format());

    for(var i = 0; i < JSON.parse(body).findBand.length; i++) {
      if(JSON.parse(body).findBand[i] === "Bands In Town"){
        console.log("Name of the venue:         " + JSON.parse(body).venue[i].value); }
      }
    }
  }

  // user input/app commands
  if(command === "spotify-this-song") {
    getMeSpotify(query);
  } else if (commmand === "movie-this") {
    findMovie(request)
  } else if(command === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(err, data) {
      var command;
      var query;
  
      // If there is a comma, then we will split the string to differentiate between command and query
      // 	--> if there is no comma, then only the command is considered!!
      if(data.indexOf(",") !== -1) {
        var dataArr = data.split(",");
        command = dataArr[0];
        query = dataArr[1];
      } else {
        command = data;
      }
  
      // Choose terminal command and run designated function
      if(command === "spotify-this-song") {
        spotifyThisSong(query);
      } else if(command === "movie-this") {
        movieThis(query);
      } else { // Use case where the command is not recognized
        console.log("Command from file is not a valid command! Please try again.")
      }
    });
  } else if(command === undefined) { // use case where no command is given
    console.log("Please enter a command to run LIRI.")
  } else { // use case where command is given but not recognized
    console.log("Not the Path You seek. Again, try.")
  }


// commands opts for initiation -- "We ARE the initiated, Bruce" - Bane
var runLiri = function(argOne, argTwo) {
  findCommand(argOne, argTwo);
  findMovie();
};

// Form Voltron
runLiri(process.argv[2], process.argv.slice(3).join(" "));


