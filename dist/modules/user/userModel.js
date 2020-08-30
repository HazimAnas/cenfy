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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = __importStar(require("bcrypt"));
const mongoose = __importStar(require("mongoose"));
/**
*  Schema for User
*  @class
*/
const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50, select: false },
    email: { type: String, required: true, max: 50 },
    displayName: { type: String, required: true, max: 50 },
    address: { type: String, max: 150 },
    phoneNumber: { type: String, max: 20 },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider" },
    dateCreated: { type: Date, default: Date.now },
    loggedIn: { type: Boolean }
});
// We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Hashes the password sent by the user for login and checks if the hashed password stored in the
        // database matches the one sent. Returns true if it does else false.
        const compare = yield bcrypt.compare(password, user.password);
        return compare;
    });
};
/**
*  Returns absolute url to specific user
*  @function
*/
UserSchema.virtual("url")
    .get(function () {
    return "/user/" + this._id;
});
// Export model
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map