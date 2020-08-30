"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
// This verifies that the token sent by the user is valid
passport_1.default.use(new passport_jwt_1.Strategy({
    // secret we used to sign our JWT
    secretOrKey: "top_secret",
    // we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("Bearer")
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Pass the user details to the next middleware
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
// middleware for custom callback of passport.authenticate
exports.protectedRoute = (req, res, next) => {
    try {
        passport_1.default.authenticate("jwt", { session: false }, function (err, user, info) {
            // if error, terminate and pass error to express
            if (err) {
                return next(err);
            }
            // no user indicate authenticate failed, return error json to client
            if (!user) {
                return res.status(401).json({ status: 401, message: "Authentication failed" });
            }
            if (req.params.id) {
                // if user id in url is different from in jwt indicate client try to access data not belonging to the user, send error json to client.
                if (user._id != req.params.id) {
                    return res.status(401).json({ status: 401, message: "Unauthorized" });
                }
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    catch (err) {
        return next(err);
    }
};
//# sourceMappingURL=authMiddleware.js.map