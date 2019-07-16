import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../user/userModel";

export let login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await User.findOne({ email: req.body.email } ).select("+password");
    if ( user ) {
      // Validate password and make sure it matches with the corresponding hash stored in the database
      // If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(req.body.password);
      if ( !validate ) {
        res.status(401).json({status: 401, message: "Wrong password"});
      } else {
        // Send the user information to the next middleware
        const data = {
            _id : user._id,
            email : user.email,
            userName : user.userName,
            displayName : user.displayName,
            address : user.address,
            serviceProvider: user.serviceProvider
          };
              // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : data }, "top_secret");
              // Send back the token to the user
        res.status(200).json({ data, token });
      }
    } else {
      // If the user isn't found in the database, return a message
      res.status(500).json({status: 500, message: "User not found"});
    }
  } catch (error) {
    return next(error);
  }
};
