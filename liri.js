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
var queryUrl;
var getMovie = function(dataPassed) {
    if (dataPassed === "") {
        queryUrl =  "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=e349a361";
    }
        queryUrl = "http://www.omdbapi.com/?t="+ dataPassed +"&y=&plot=short&apikey=e349a361";
        console.log("The query is " + queryUrl);
    axios.get(queryUrl).then(function(response) {
        var movieInfo = response.data;
        //for (var i = 0; i < movieInfo.length; i++){
        //console.log(movieInfo);
        //console.log(i);
        console.log("The movie's name is: " + movieInfo.Title);
        console.log("Release Year: " + movieInfo.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        console.log("Country: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Plot: " +  movieInfo.Plot);
        console.log("Actors: " + movieInfo.Actors);
        console.log("Director: " + movieInfo.Director);
        console.log("----------------------------------------");
        //} //end for
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });
} //end getMovie


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

/*
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
  
    }
  }*/