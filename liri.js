//Add code to read and set any environment variables with the dotenv package.
require("dotenv").config();

//Add the code required to import the keys.js file and store it in a variable.
var keys = require('keys.js');

//access your keys information like so.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Make liri.js can take in `my-tweets`.