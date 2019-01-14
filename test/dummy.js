var async = require('async');
var User = require('../src/models/user');

const app_name = "cenfy"
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1:27017/" + app_name;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []

function userCreate(userName, password, email, displayName, cb) {
  userdetail = {userName:userName , password: password , email: email , displayName: displayName }
  console.log("cb = " + cb)
  var user = new User(userdetail);

  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User : ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('Patrick', 'Rothfuss', 'Patrick@Rothfuss', 'Patrick Rothfuss', callback);
        },
        function(callback) {
          userCreate('Ben', 'Bova', 'Ben@Bova', 'Ben Bova', callback);
        },
        function(callback) {
          userCreate('Isaac', 'Asimov', 'Isaac@Asimov', 'Isaac Asimov', callback);
        },
        function(callback) {
          userCreate('Bob', 'Billings', 'Bob@Billings', 'Bob Billings', callback);
        },
        function(callback) {
          userCreate('Jim', 'Jones', 'Jim@Jones', 'Jim Jones', callback);
        },
        ],
        // optional callback
        cb);
}


async.series([
    createUsers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Users: '+users);

    }
    // All done, disconnect from database
    db.close();
});
