"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
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
    customers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5c5a8ee8fe800304b866511e" } }],
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