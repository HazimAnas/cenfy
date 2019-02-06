var async = require('async');
var User = require('../dist/modules/user/userModel');
var ServiceProvider = require('../dist/modules/service-provider/serviceProviderModel');

const app_name = "cenfy"
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1:27017/" + app_name;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var sps = [];

function userCreate(userName, password, email, displayName, cb) {
  userdetail = {userName:userName , password: password , email: email , displayName: displayName }
  console.log("cb = " + cb)
  var user = new User.User(userdetail);

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

function serviceProviderCreate(description, categories, user, displayName, cb) {
  serviceProviderdetail = {description: description , categories: categories, user: user, displayName: displayName }
  console.log("cb = " + cb)
  var serviceProvider = new ServiceProvider.ServiceProvider(serviceProviderdetail);

  serviceProvider.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New SP : ' + serviceProvider);
    sps.push(serviceProvider)
    cb(null, serviceProvider)
  }  );
}

function createServiceProviders(cb) {
    async.parallel([
        function(callback) {
          serviceProviderCreate('SPPatrick', [{name:'barber'}], users[0]._id, 'SPPatrick Rothfuss', callback);
        },
        function(callback) {
          serviceProviderCreate('SPBen', [{name:'plumber'}], users[1]._id, 'SPBen Bova', callback);
        },
        function(callback) {
          serviceProviderCreate('SPIsaac', [{name:'electician'}], users[2]._id, 'SPIsaac Asimov', callback);
        },
        function(callback) {
          serviceProviderCreate('SPBob', [{name:'plumber'}], users[3]._id, 'SPBob Billings', callback);
        },
        function(callback) {
          serviceProviderCreate('SPJim', [{name:'mechanic'}], users[4]._id, 'SPJim Jones', callback);
        },
        ],
        // optional callback
        cb);
}


async.series([
    createUsers,
    createServiceProviders
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Users: '+users);
        console.log('Users: '+sps);

    }
    // All done, disconnect from database
    db.close();
});
