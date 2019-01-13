const express = require('express');
const app = express();
const port = 3000;
const app_name = "cenfy"

//Attach all route
var usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1:27017/" + app_name;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
