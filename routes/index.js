const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
const teams = require('./team');
const games = require('./game');
app.use('/teams', teams);
app.use('/games', games);
exports.app=app;