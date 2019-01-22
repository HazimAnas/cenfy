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
    category: [{ name: String }],
    images: [{ loc: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, default: false, required: true }
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