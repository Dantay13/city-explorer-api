'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3002;


