//requires
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
moment().format();

// process Concert request to Axios/Bands in Town
var findConcert = function(dataPassed) {
    var artist = dataPassed;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {   
            var bandInfo = response.data;
            for (var i = 0; i < response.data.length; i++) {
                console.log("------------------ Event # " + i + "-----------------------");
                console.log("ARTIST:  " + artist);
                console.log("DATE:    " + moment(bandInfo[i].datetime).format("MM/DD/YYYY"));
                console.log("CITY:    " + bandInfo[i].venue.city);
                console.log("COUNTRY: "  + bandInfo[i].venue.country);
                console.log("VENUE:   " + bandInfo[i].venue.name);
            } //end for
        }) //end function and get
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }); //end catch
} //end findConcert


//process Spotify requests
var spotify = new Spotify(keys.spotify);
var getSong = function(dataPassed) {
    var songName = dataPassed;
        if (dataPassed === undefined) {
        songName = "Miss Grace";
    }
    //console.log("***SONG IS*** " + songName);
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songs = data.tracks.items; 
        for (var i = 0; i < songs.length; i++) {
            console.log("------------------ Song # " + i + "-----------------------");
            //console.log(songs[i]);
            console.log("SONG NAME:  " + songs[i].name);
            console.log("ALBUM NAME: " + songs[i].album.name);
            console.log("ARTIST(S):  " + songs[i].artists[0].name);
            console.log("HEAR SONG:  " + songs[i].external_urls.spotify);
        } //end for
    }); //end search
} // end getSong

//process movie requests to Axios/OMDB
var queryUrl;
var getMovie = function(dataPassed) {
    if (dataPassed === undefined) {
        queryUrl =  "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=e349a361";
    }
        queryUrl = "http://www.omdbapi.com/?t="+ dataPassed +"&y=&plot=short&apikey=e349a361";
        //console.log("The query is " + queryUrl);
    axios.get(queryUrl).then(function(response) {
        var movieInfo = response.data;
        console.log("THE MOVIE'S NAME IS:    " + movieInfo.Title);
        console.log("YEAR RELEASED:          " + movieInfo.Year);
        console.log("IMDB RATING:            " + response.data.imdbRating);
        console.log("ROTTEN TOMATOES RATING: " + movieInfo.Ratings[1].Value);
        console.log("COUNTRY:                " + movieInfo.Country);
        console.log("LANGUAGE:               " + movieInfo.Language);
        console.log("BRIEF PLOT:             " +  movieInfo.Plot);
        console.log("MAIN ACTORS:            " + movieInfo.Actors);
        console.log("DIRECTOR:               " + movieInfo.Director);
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

//process the random command/file
var readFile = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } //end if
        console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length == 2) {
            doIt(dataArr[0], dataArr[1]);
        } //end if

    }); //end fs
} //end => readFile


var doIt = function (caseChosen, dataPassed) {
    switch(caseChosen) {
        case 'concert-this':
            findConcert(dataPassed);
            break;
        case 'spotify-this':
                if (dataPassed === "") {
                    dataPassed = "Miss Grace";
                }
            getSong(dataPassed);
            break;
        case 'movie-this':
            getMovie(dataPassed);
            break;
        case 'do-this':
            readFile();
            break;
        default:
            console.log("Sorry, noone told LIRI how to do that.");
    } //end switch
} // end doIt

//what is the user asking for? which case, what data?
var getCommand = function(arg2, arg3) {
    console.log("arg2 is " + arg2 + " arg3 is " + arg3);
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
 

   //For Loop to search for songs with multiple words in title.
   for (var i = 3; i < nodeArgs.length; i++) {
    if (i >= 3 && i < nodeArgs.length) {
        artist = artist +  "+" + nodeArgs[i];
    } else {
        artist = ""
         }*/