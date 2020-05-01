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
    categories: [ { type: String, _id : false } ],
    images: [ { type: String, _id : false } ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, default: false, required: true },
    dateCreated: { type: Date, default: Date.now },
    rank: { type: Number },
    statistics: { view: { type: Number }, contact: { type: Number } },
    customers: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    ads: [ { type: String } ]
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
