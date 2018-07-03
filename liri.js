//import { EILSEQ } from 'constants';

//Add code to read and set any environment variables with the dotenv package.
require('dotenv').config();

//Add the code required to import the keys.js, twitter and spotify fils and store it in a variable.
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('file-system');
// var define = require("node-constants")(exports);


//access your keys information like so.
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// call tweets frm my account 
function getMytweets() {
    var params = {screen_name: 'Ztech67520572'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length ; i++){
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log('----------------------------------------------------');
    }
  }
});
}
// call for songs from spotify
var getArtistNames = function(artist) {
    return artist.name;
}
var getMeSpotify = function(songName){
  
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
       
      var songs = data.tracks.items;
      for(var i=0; i<songs.length; i++) {
          console.log(i);
          console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
          console.log('song name: ' + songs[i].name);
          console.log('preview song: ' + songs[i].preview_url);
          console.log('album: ' + songs[i].album.name);
          console.log('---------------------------------------------------');
      } 
      });
}
// get movies 
var getMeMovies = function(movieName){ 

request('http://www.omdbapi.com/?t=' + movieName + '&apikey=42ef8ec3', function (error, response, body) {
  
  if (!error && response.statusCode == 200) {
  
  var  jasonData = JSON.parse(body);
  console.log('Title: ' + jasonData.Title);
  console.log('Year: ' + jasonData.Year);
  console.log('Rated: ' + jasonData.Rated);
  console.log('IMDB rating: ' + jasonData.imdbRating);
  console.log('Country: ' + jasonData.Country);
  console.log('Language: ' + jasonData.Language);
  console.log('Plot: ' + jasonData.Plot);
  console.log('Actors: ' + jasonData.Actors);
  console.log('Rotten Tomatoes Rating: ' + jasonData.tomatoRating);
  console.log('Rotten Tomatoes URL: ' + jasonData.tomatoURL);
  }
});
}
//fs read files from random.txt
var doWhatItSays = function(){
fs.readFile('./random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    
    var dataArr = data.split(',');

    if (dataArr.length == 2) {
        pick(dataArr[0], dataArr[1]);
    } else if(dataArr.length ==1) {
        pick(dataArr[0]);
    }
  });
}
//create switch statements ;
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets':
        getMytweets();
        break;
        case 'spotify-this-song':
        getMeSpotify(functionData);
        break;
        case 'movie-this':
        getMeMovies(functionData);
        case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
    console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

// call for songs from spotify
var getMeSpotify = function(songName){
  
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return
        }
       
      console.log(data.tracks.items); 
      });
};
