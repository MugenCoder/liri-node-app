// add code to read & set any environmental variables w/ dotenv package
require("dotenv").config();
// required to link keys
// sudo npm i axio -g
var fs = require("fs");
var keys = require("./keys");
var axios = requie("./axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var stingify = require("JSON-stingify-safe");


// create var to access key info 
var spotify = new Spotify(keys.spotify);

// cli input?
var query = process.argv[2];
var search = process.argv.slice(3).join(" ");

// This block of code will create a file called "random.txt".
fs.writeFile("random.txt", "utf-8", function(err) {
// If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    } 
// Otherwise, it will print: "random.txt was updated!"
    console.log("random.txt was updated!");
  });
// search + query logic
    if(process.argv[2] = " "){
        var str = data;
        var array = str.split(",");

        console.log(array);
        var outputTo = {
            query: array[0],
            search: array[1]
        };
        console.log(outputTo);
            return outputTo;
    }

    if(query == "spotify-this-song"){
        spotify
            .search({type: track, query: search})
            .then(function(response) {

            var spotifyInfo = response.tracks.items[0];
            console.log(JSON.stringify(response.tracks.items[0],null,2));
    })
};

// spotify callback console-view vars
var artist = spotifyInfo.artists[0].name;
var songName = spotify.song.name;
var preview = spotify.preview;
var album = spotfyInfo.album;
    // When the magic isn't working
    if(songName === null){
        console.log("Not A Thing, Bro");
        console.log("Also Not A Thing");
        console.log("Can't Do What's Never Heard Of");
        console.log("No Album Art, Fam")
    } else {
    // When you feel fucking magical
    console.log("Artist: + ");
    console.log("Song: +");
    console.log("Song Preview: +");
    console.log("Album: +");
    } 

    if(query == "concert-this"){
        search = process.argv.slice[3].join(" ");
        console.log(element);
    }

// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// axios requests B.I.T. API
var queryUrl = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
    console.log(queryUrl);

    axios.get(queryUrl).then(function(response) {
        var jsonData = response.data;
        console.log(stinginfy(response.data[0], null, 2))
    });

    var bandInfo = response.data[0];

    // info to render to terminal
    var venue = bandInfo.venue.name;
    var location = bandInfo.city + " ", bandInfo.region + " ", bandInfo.country + " ";  
    // Date of the Event (use moment to format this as "MM/DD/YYYY")
    // define(['moment'], function (moment) {
    // console.log(moment().format('LLLL'));  // 'Friday, June 24, 2016 1:42 AM'// });
    var eventDate = moment(bandInfo.date "MM/DD/YYYY").format("MM/DD/YYYY");
    console.log("Venue: + venue");
    console.lot("Location + location");
    console.log(Date: + date);




// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
// var concert = process.argv[2];
// var song = process.argv[3];
// var movie = process.argv[4];
// var reccomendation = process.argv[5];





// if (a === b) {
//     console.log(true);
// }
// else {
//     console.log(false);
// }

