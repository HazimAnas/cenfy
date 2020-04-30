"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
/**
*  Schema for User
*  @class
*/
const ServiceProviderSchema = new mongoose.Schema({
    displayName: { type: String, maxlength: 150, required: true },
    description: { type: String, maxlength: 300 },
    categories: [{ name: { type: String }, _id: false }],
    images: [{ loc: { type: String }, _id: false }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, default: false, required: true },
    dateCreated: { type: Date, default: Date.now },
    rank: { type: Number },
    statistics: { view: { type: Number }, contact: { type: Number } },
    customers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    ads: [{ id: { type: String } }]
});
/**
*  Returns absolute url to specific user
*  @function
*/
ServiceProviderSchema.virtual("url")
    .get(function () {
    return "/sp/" + this._id;
});
// Export model
exports.ServiceProvider = mongoose.model("ServiceProvider", ServiceProviderSchema);
//# sourceMappingURL=serviceProviderModel.js.map