import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { IUser } from "./userInterface";

export interface IUserModel extends IUser, mongoose.Document { }

/**
*  Schema for User
*  @class
*/
const UserSchema = new  mongoose.Schema (
  {
    userName: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50, select: false },
    email: { type: String, required: true, max: 50 },
    displayName: { type: String, required: true, max: 50 },
    address: { type: String, max: 150 },
    phoneNumber: { type: String, max: 20 },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider" },
    dateCreated: { type: Date, default: Date.now },
    loggedIn: { type: Boolean }
  }
);
// We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password: string) {
  const user = this;
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

/**
*  Returns absolute url to specific user
*  @function
*/
UserSchema.virtual("url")
.get( function(this: any ) {
  return "/user/" + this._id;
});

// Export model
export const User = mongoose.model<IUserModel>("User", UserSchema);
