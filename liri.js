//requires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
moment().format();

//process spotify requests
var spotify = new Spotify(keys.spotify);
var getArtistsNames = function(artist) {
    return artist.name;
}
var getSong = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songs = data.tracks.items; 
        for (var i = 0; i = songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistsNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album name: " + songs[i].album.name);
            console.log("----------------------------------------");
        } //end for
    }); //end search
} // end getSong
 
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
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

var doIt = function (caseChosen, dataPassed) {
    switch(caseChosen) {
        case 'concert-this':
            //code
            break;
        case 'spotify-this-song':
            getSong(dataPassed);
            break;
        case 'movie-this':
            //code
            break;
        case 'do-what-it-says':
            //code
            break;
        default:
            console.log("Sorry, noone told LIRI how to do that.");
    }
}

//what is the user asking for? which case, what data?
var getCommand = function(arg3, arg4) {
    doIt(arg3, arg4);
}
getCommand(process.argv[3], process.argv[4]);