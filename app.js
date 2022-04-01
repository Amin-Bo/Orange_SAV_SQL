const express=require('express');
const connection = require("./connection");
const app = express();
const employee = require('./routes/employee');
app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use('/', employee);
module.exports = app;