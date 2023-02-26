'use strict';

const axios = require('axios');
const cache = require('./cache');

function getWeather (request, response, next) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const key = `lat: ${lat}, lon: ${lon}`;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=10`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 240000)) {
    console.log('cache for weather hit');
    response.status(200).send(cache[key].data);
  } else {
    console.log('miss weather cache');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    axios.get(weatherUrl)
      .then(data => {
        const weatherResponse = data.results.map(weather => new Forecast(weather));
        cache[key].data = weatherResponse;
        response.status(200).send(weatherResponse);
      })
      .catch(error => next(error));
  }
}

class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.description = city.weather.description;
  }
}

module.exports = getWeather;
