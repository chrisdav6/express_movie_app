const express = require('express');
const router = express.Router();
const request = require("request");

const apiKey = 'efb9aed82a7d0674f55c6e76a9ca4fb1';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', (req, res, next) => {

  //Make movie request
  request.get(nowPlayingUrl, (error, response, movies) => {
    if(error) {
      console.log(error);
    }
    console.log(movies);
    res.render('index', { 
      title: "Movie App",
      movies: JSON.parse(movies) 
    });
  })

  //Render
  
});

module.exports = router;
