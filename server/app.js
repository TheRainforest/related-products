require('dotenv').config();
const nr = require('newrelic');
const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

module.exports = app;
