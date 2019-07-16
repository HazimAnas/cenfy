import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// This verifies that the token sent by the user is valid
passport.use( new Strategy ({
  // secret we used to sign our JWT
  secretOrKey : "top_secret",
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("Bearer")
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
// middleware for custom callback of passport.authenticate
export let protectedRoute = (req: Request, res: Response, next: NextFunction) => {
      try {
        passport.authenticate("jwt", { session: false }, function(err, user, info) {
          // if error, terminate and pass error to express
          if (err) {
            return next(err);
          }
          // no user indicate authenticate failed, return error json to client
          if (!user) {
            return res.status(401).json({status: 401, message: "Authentication failed"});
          }
          if (req.params.id) {
            // if user id in url is different from in jwt indicate client try to access data not belonging to the user, send error json to client.
            if (user._id != req.params.id) {
              return res.status(401).json({status: 401, message: "Unauthorized"});
            }
          }
          req.user = user;
          next();
        })(req, res, next);
      } catch (err) {
        return next(err);
      }
  };
