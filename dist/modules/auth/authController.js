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
const jwt = __importStar(require("jsonwebtoken"));
const userModel_1 = require("../user/userModel");
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user associated with the email provided by the user
        const user = yield userModel_1.User.findOne({ email: req.body.email }).select("+password");
        if (user) {
            // Validate password and make sure it matches with the corresponding hash stored in the database
            // If the passwords match, it returns a value of true.
            const validate = yield user.isValidPassword(req.body.password);
            if (!validate) {
                res.status(500).json({ status: 500, message: "Wrong password" });
            }
            // Send the user information to the next middleware
            const data = {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                displayName: user.displayName,
                address: user.address
            };
            // Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user: data }, "top_secret");
            // Send back the token to the user
            res.json({ data, token });
        }
        else {
            // If the user isn't found in the database, return a message
            res.status(500).json({ status: 500, message: "User not found" });
        }
    }
    catch (error) {
        return next(error);
    }
});
//# sourceMappingURL=authController.js.map