//Add code to read and set any environment variables with the dotenv package.
require('dotenv').config();

//Add the code required to import the keys.js, twitter and spotify fils and store it in a variable.
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//access your keys information like so.
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// call tweets frm my account 
function getMytweets() {
    var params = {screen_name: 'Ztech67520572'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length ; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
    }
  }
});
};
//getMytweets();


// call for songs from spotify
function spotifyThisSong() {
    var songName; 
    if (songName === undefined){
        songName = process.argv[2];
        console.log(process.argv[2]);
    } else {
        songName = 'The Sign';
    };
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items); 
      });
};
spotifyThisSong(); 