import * as mongoose from "mongoose";
import { IServiceProvider } from "./serviceProviderInterface";

export interface IServiceProviderModel extends IServiceProvider, mongoose.Document { }

/**
*  Schema for User
*  @class
*/
const ServiceProviderSchema = new  mongoose.Schema (
  {
    userName: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50 },
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
ServiceProviderSchema.virtual("url")
.get( function(this: any ) {
  return "/sp/" + this._id;
});

// Export model
export const ServiceProvider = mongoose.model<IServiceProviderModel>("ServiceProvider", ServiceProviderSchema);
