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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
