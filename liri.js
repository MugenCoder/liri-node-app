// add code to read & set any environmental variables w/ dotenv package
require("dotenv").config();
// required to link keys
// sudo npm i axio -g
var keys = require("./keys");
var axios = requie("./axios");


// create var to access key info 
var spotify = new Spotify(keys.spotify);

// cli input?
var query = process.argv[2];
var search = process.argv.slice(3).join(" ");

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var concert = process.argv[2];
var song = process.argv[3];
var movie = process.argv[4];
var reccomendation = process.argv[5];

// This block of code will create a file called "movies.txt".
fs.writeFile("random.txt", "Inception, Die Hard", function(err) {
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    } 
    // Otherwise, it will print: "random.txt was updated!"
    console.log("random.txt was updated!");
  });




if (a === b) {
    console.log(true);
}
else {
    console.log(false);
}
// // Solution 1 - More Obvious
// var a = process.argv[2];
// var b = process.argv[3];

// if (a === b) {
//   console.log(true);
// }
// else {
//   console.log(false);
// }


// // Solution 2 - Simplified (Re-factored)
// console.log(process.argv[2] === process.argv[3]);

