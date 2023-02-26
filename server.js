'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const getWeather = require('./weather');
const getMovie = require('./movie');

const app = express();


app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('this test is working bro');
});

app.get('/weather', getWeather);
app.get('/movie', getMovie);


// app.get('/weather', (request, response) => {
//   console.log(request.query);
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   //   let searchQuery = request.query.searchQuery;
//   console.log('Lat:',lat);
//   console.log('Lon:', lon);
//   //   console.log('City:', searchQuery);
//   //   let locationForecast = new Forecast(searchQuery);
//   //   let locationDateAndDesc = locationForecast.getDateAndDesc();
//   //   console.log(locationDateAndDesc);
//   response.status(200).send(lat);
// });

// class Forecast{
//   constructor(searchQuery){
//     let weather = weatherData.find(obj => obj.city_name === searchQuery);
//     this.weatherForecast = weather.data;
//     this.lat = weather.lat;
//     this.lon = weather.lon;
//     this.date = weather.data.map(element => element.datetime);
//     this.desc = weather.data.map(element => element.weather.description);
//   }
// }

app.listen(PORT, () => console.log(`listening on ${PORT}`));
