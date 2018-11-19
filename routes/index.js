const express = require('express');
const router = express.Router();
const request = require("request");

const apiKey = 'efb9aed82a7d0674f55c6e76a9ca4fb1';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

//Use imageBaseUrl in all routes
router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

/* GET home page. */
router.get('/', (req, res, next) => {

  //Make movie request
  request.get(nowPlayingUrl, (error, response, movieData) => {
    if(error) {
      console.log(error);
    }

    const parsedMovieData = JSON.parse(movieData);
    console.log(parsedMovieData.results);

    res.render('index', { 
      title: "Movie Finder 5000",
      movies: parsedMovieData.results
    });
  });
  
});

/* GET single movie */
router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  //Make movie request
  request.get(thisMovieUrl, (error, response, movieData) => {
    if (error) {
      console.log(error);
    }

    const parsedMovieData = JSON.parse(movieData);
    console.log(parsedMovieData.results);

    res.render('singleMovie', {
      title: "Movie Finder 5000",
      movies: parsedMovieData
    });
  });

});

/* POST search */
router.post('/search', (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  
  //Make movie request
  request.get(movieUrl, (error, response, movieData) => {
    if (error) {
      console.log(error);
    }

    let parsedMovieData = JSON.parse(movieData);
    console.log(parsedMovieData.results);

    if(cat === "person") {
      parsedMovieData.results = parsedMovieData.results[0].known_for;
    }
    
    res.render('index', {
      title: "Movie Finder 5000",
      movies: parsedMovieData.results
    });
  });
  
});

module.exports = router;
