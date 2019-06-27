//requires
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
const chalk = require('chalk');
var moment = require('moment');
moment().format();

//other variables
var artist; //for concerts
var songName; //for spotify

//my logging function to log to console, 
//create (if doesn't exist) log file and append to it
//you must have const fs = require("fs"); in your file

function log(content) { //pass your content into the function
	console.log(content); //console log the content
	 	fs.appendFile("log.txt", content + "\n", err => { //append content to the log file
            if (!err) {
                //console.log("Append successful"); //if logging is successful, tell the console
            }// end fs
		}) // end if
    } // end log

startLiri();
function startLiri() {
console.log(chalk.blue.bold("Type one of the commands below to start, or LIRI will say:")); //go to default case
}

//At the command line users will type one of four node commands:
// node liri concert-this <artist name>
// node liri spotify-this <song name>
// node liri movie-this <movie name>
// node liri do-this
// The doIt function will sort the request and data input and send the correct request
// The correct response will then be shown to the user

// process Concert request to Axios/Bands in Town
var findConcert = function(dataPassed) {
    artist = dataPassed;
    log(chalk.green("Concert Request Processed for " + chalk.blue.underline.bold(artist) + " at " + moment().format("MM/DD/YYYY, h:mm:ss a ")));
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {   
            var bandInfo = response.data;
            for (var i = 0; i < response.data.length; i++) {
                log(chalk.magenta("------------------ Event # " + i + "-----------------------"));
                log("ARTIST:  " + artist);
                log("DATE:    " + moment(bandInfo[i].datetime).format("MM/DD/YYYY"));
                log("CITY:    " + bandInfo[i].venue.city);
                log("COUNTRY: "  + bandInfo[i].venue.country);
                log("VENUE:   " + bandInfo[i].venue.name);
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
    songName = dataPassed;
        if (dataPassed === undefined) {
        songName = "Miss Grace";
    }
	log(chalk.green("Song Request Processed for " + chalk.blue.underline.bold(songName ) + " at " + moment().format("MM/DD/YYYY, h:mm:ss a ")));
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songs = data.tracks.items; 
        for (var i = 0; i < songs.length; i++) {
            log(chalk.cyan("------------------ Song # " + i + "-----------------------"));
            //console.log(songs[i]);
            log("SONG NAME:  " + songs[i].name);
            log("ALBUM NAME: " + songs[i].album.name);
            log("ARTIST(S):  " + songs[i].artists[0].name);
            log("HEAR SONG:  " + songs[i].external_urls.spotify);
        } //end for
    }); //end search
} // end getSong

//process movie requests to Axios/OMDB
var queryUrl;
var getMovie = function(dataPassed) {
    if (dataPassed === undefined) {
        dataPassed = 'Mr+Nobody';
//        queryUrl =  "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=e349a361";
    }
        queryUrl = "http://www.omdbapi.com/?t="+ dataPassed +"&y=&plot=short&apikey=e349a361";
	log(chalk.green("Movie Request Processed for " + chalk.blue.underline.bold(dataPassed) + " at " + moment().format(" MM/DD/YYYY, h:mm:ss a ")));
    axios.get(queryUrl).then(function(response) {
        var movieInfo = response.data;
        log("THE MOVIE'S NAME IS:    " + movieInfo.Title);
        log("YEAR RELEASED:          " + movieInfo.Year);
        log("IMDB RATING:            " + response.data.imdbRating);
        log("ROTTEN TOMATOES RATING: " + movieInfo.Ratings[1].Value);
        log("COUNTRY:                " + movieInfo.Country);
        log("LANGUAGE:               " + movieInfo.Language);
        log("BRIEF PLOT:             " + movieInfo.Plot);
        log("MAIN ACTORS:            " + movieInfo.Actors);
        log("DIRECTOR:               " + movieInfo.Director);
        log(chalk.cyan("----------------------------------------"));
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
	log(chalk.green("Random Request Processed at " + moment().format("MM/DD/YYYY, h:mm:ss a ")));
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
            console.log(chalk.bold("Sorry, noone told LIRI how to do that."));
            console.log("");
            console.log("node liri concert-this <artist name>");
            console.log("node liri spotify-this <song name>");
            console.log("node liri movie-this <movie name>");
            console.log("node liri do-this");
    } //end switch
} // end doIt

//what is the user asking for? which case, what data?
var getCommand = function(arg2, arg3) {
    //console.log("arg2 is " + arg2 + " arg3 is " + arg3);
    doIt(arg2, arg3);
}
getCommand(process.argv[2], process.argv[3]);