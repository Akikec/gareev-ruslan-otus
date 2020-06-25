const express = require('express');
const router = require('./ads/AdsController');
const app = express();
app.use('/', router);
module.exports = app;