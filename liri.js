require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
moment().format();

var spotify = new Spotify(keys.spotify);
 
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 console.log(data); 
});

 
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

var doIt = function () {
    switch() {
        case concert-this:
            //code
            break;
        case spotify-this-song:
            //code
            break;
        case movie-this:
            //code
            break;
        case do-what-it-says:
            //code
            break;
        default:
            console.log("Sorry, noone told LIRI how to do that.");
    }
}


