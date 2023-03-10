'use strict';

const axios = require('axios');
const cache = require('./cache');

function getMovie(request, response, next) {
  const movie = request.query.searchQuery;
  const key = `Movie: ${movie}`;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('cache for movie hit');
    response.status(200).send(cache[key].data);
  } else {
    console.log('miss movie cache');
    axios.get(movieUrl)
      .then(data => {
        const movieResponse = data.results.map(movie => new Movie(movie));
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = movieResponse;
        response.status(200).send(movieResponse);
      })
      .catch(error => next(error));
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.average_votes;
    this.total_votes = movie.total_votes;
    this.poster_path = movie.poster_path;
    this.popularity = movie.popularity;
    this.release_date = movie.release_date;
  }
}

module.exports = getMovie;
