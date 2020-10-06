const express = require('express');
const db = require('./database/configDb');
const app = express();

const searchRoute = require('./routes/searchRoute');
const githubRoute = require('./routes/githubRoute');

Db = new db();

Db.connect(); //create if not exists and connect to the DB
Db.createTableSearch(); //create the table if not exists

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/github', githubRoute);
app.use('/getSearchs', searchRoute);

app.use((req, res, next) => {
    const error = new Error('route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   return res.send({
       error: {
           message: error.message
       }
   })
});



module.exports = app;