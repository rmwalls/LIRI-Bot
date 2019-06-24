//requires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
moment().format();

//process Spotify requests
var spotify = new Spotify(keys.spotify);


var getSong = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songs = data.tracks.items; 
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            //console.log(songs[i]);
            console.log("song name: " + songs[i].name);
            console.log("album name: " + songs[i].album.name);
            console.log("artist(s): " + songs[i].artists[0].name);
            console.log("preview song: " + songs[i].external_urls.spotify);
            console.log("----------------------------------------");
        } //end for
    }); //end search
} // end getSong

//process movie requests to Axios/OMDB

var getMovie = function(dataPassed) {
    var queryUrl = "http://www.omdbapi.com/?t="+ dataPassed +"&y=&plot=short&apikey=e349a361";
    axios.get(queryUrl).then(function(response) {
    console.log("The movie's data is: " + response.data.title);
  })
  
} //end getMovie

/*
// Make a request for a user with a given ID
axios.get('/user?ID=e349a361')
    .then(function (response) {
    // handle success
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
});
*/

var doIt = function (caseChosen, dataPassed) {
    switch(caseChosen) {
        case 'concert-this':
            //code
            break;
        case 'spotify-this-song':
            getSong(dataPassed);
            break;
        case 'movie-this':
            getMovie(dataPassed);
            break;
        case 'do-what-it-says':
            //code
            break;
        default:
            console.log("Sorry, noone told LIRI how to do that.");
    } //end switch
} // end doIt

//what is the user asking for? which case, what data?
var getCommand = function(arg2, arg3) {
    doIt(arg2, arg3);
}
getCommand(process.argv[2], process.argv[3]);