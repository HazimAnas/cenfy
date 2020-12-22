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
    categories: [{ name: {type: String }, _id : false }],
    address: { line1: { type: String, max: 150 }, line2: { type: String, max: 150 }, state: { type: String, max: 150 }, postcode: { type: String, max: 150 }, lat: { type: String }, long: { type: String }},
    images: [{ imagetype: { type: String }, loc: { type: String }, _id : false }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, default: false, required: true },
    dateCreated: { type: Date, default: Date.now },
    rank: { type: Number },
    statistics: { favorite: { type: Number }, view: { type: Number }, contact: { type: Number } },
    customers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5c5a8ee8fe800304b866511e" } }],
    followers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5c5a8ee8fe800304b866511e" } }],
    ads: [{id: { type: String } }]
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
