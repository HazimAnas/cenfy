var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
Schema for User
@class
*/
var UserSchema = new Schema (
  {
    userName: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50 },
    email: { type: String, required: true, max: 50 },
    displayName: { type: String, required: true, max: 50 },
    address: { type: String, max: 150 },
    phoneNumber: { type: String, max: 20 },
  }
);

/** Returns absolute url to specific user
@function
*/
UserSchema.virtual('url')
.get(function () {
  return '/user/' + this._id;
});


//Export model
module.exports = mongoose.model('User', UserSchema);
