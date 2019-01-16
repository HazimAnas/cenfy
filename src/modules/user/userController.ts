import { NextFunction, Request, Response } from "express";
import { User } from "./userModel";

// Display list of all User.
export let getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const usersList = await User.find({}, "email displayName").exec();
      responseHandling(usersList, res);
    } catch (err) {
      return next(err);
    }
};

// Create a new User.
export let createUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Create user");
};

// Update a User.
export let updateUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Update user");
};

// Delete a User.
export let deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).exec();
      responseHandling(user, res);
    } catch (err) {
      next(err);
    }
};

// Display detail page for a specific User.
export let getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id, "email displayName").exec();
      responseHandling(user, res);
    } catch (err) {
      next(err);
    }
};
//wip
function responseHandling(data: any, res: Response) {
  JSON.stringify(data);
  if (data != null) {
    if (data.password) {
      delete data.password;
    }
    res.json({status: 200, message: "Successful", data});
  } else {
    res.status(500).json({status: 500, message: "Unsuccessful", data});
  }
}
