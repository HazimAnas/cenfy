import * as mongoose from "mongoose";
import { IServiceProvider } from "./serviceProviderInterface";

export interface IServiceProviderModel extends IServiceProvider, mongoose.Document { }

/**
*  Schema for User
*  @class
*/
const ServiceProviderSchema = new  mongoose.Schema (
  {
    displayName: { type: String, maxlength: 150, required: true},
    description: { type: String, maxlength: 300 },
    category: [{name: String}],
    images: [{loc: String}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, default: false }
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
