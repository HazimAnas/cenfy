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
const Schema = mongoose.Schema;
/**
Schema for User
@class
*/
const UserSchema = new Schema({
    userName: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50 },
    email: { type: String, required: true, max: 50 },
    displayName: { type: String, required: true, max: 50 },
    address: { type: String, max: 150 },
    phoneNumber: { type: String, max: 20 },
});
/** Returns absolute url to specific user
@function
*/
UserSchema.virtual("url")
    .get(function () {
    return "/user/" + this._id;
});
// Export model
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map