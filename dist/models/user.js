"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map