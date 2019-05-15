"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    dateCreated: { type: Date },
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