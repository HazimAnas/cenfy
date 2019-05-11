import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "./userModel";

  // Display list of all User.
export let getUsers = async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const usersList = await User.find({}, "email username displayName").exec();
        responseHandling(usersList, res);
      } catch (err) {
        return next(err);
      }
  };

  // Create a new User.
export let createUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          req.body.password = hashedPassword;
          const user = new User(req.body);
          const createdUser = await user.save();
          responseHandling(createdUser, res);
      } catch (err) {
        return next(err);
      }
  };

  // Update a User.
export let updateUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body).exec();
        responseHandling(user, res);
      } catch (err) {
        return next(err);
      }
  };

  // Delete a User.
export let deleteUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await User.findByIdAndDelete(req.params.id).exec();
        responseHandling(user, res);
      } catch (err) {
        return next(err);
      }
  };

  // Display detail page for a specific User.
export let getUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await User.findById(req.params.id).exec();
        responseHandling(user, res);
      } catch (err) {
        return next(err);
      }
  };
  // wip
function responseHandling(data: any, res: Response) {
    if (data != null) {
      if (data.password) {
        data = data.toObject();
        delete data.password;
      }
      JSON.stringify(data);
      res.json({status: 200, message: "Successful", data});
    } else {
      res.status(500).json({status: 500, message: "Unsuccessful", data});
    }
  }
