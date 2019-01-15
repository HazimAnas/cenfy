import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
Schema for User
@class
*/
const UserSchema = new Schema (
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
UserSchema.virtual("url")
.get(function() {
  return "/user/" + this._id;
});

// Export model
export const User = mongoose.model("User", UserSchema);
