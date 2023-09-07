const express = require('express');
var path = require('path');

const app = express();
var cors = require('cors');
const whitelist = ['*'];
const corsOptions = {
  credentials: false, // This is important.
  origin: "*"
}

app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
//view engine setup
app.set('view engine', 'ejs');
const teams = require('./team');
const games = require('./game');
const admin = require('./admin');

app.use('/teams', teams);
app.use('/games', games);
app.use('/', admin);

exports.app=app;