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
exports.login = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const userModel_1 = require("../user/userModel");
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user associated with the email provided by the user
        const user = yield userModel_1.User.findOne({ email: req.body.email }).select("+password");
        if (user) {
            // Validate password and make sure it matches with the corresponding hash stored in the database
            // If the passwords match, it returns a value of true.
            const validate = yield user.isValidPassword(req.body.password);
            if (!validate) {
                res.status(401).json({ status: 401, message: "Wrong password" });
            }
            else {
                // Send the user information to the next middleware
                const data = {
                    _id: user._id,
                    email: user.email,
                    userName: user.userName,
                    displayName: user.displayName,
                    address: user.address,
                    serviceProvider: user.serviceProvider
                };
                // Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user: data }, "top_secret");
                // Send back the token to the user
                res.status(200).json({ data, token });
            }
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