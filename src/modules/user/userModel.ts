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
  }
);

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
