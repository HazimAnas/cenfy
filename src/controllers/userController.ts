import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

// Display list of all User.
export let getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersList = User.find({}, "email displayName").exec();
      res.json(await usersList);
    } catch (err) {
      return next(err);
    }
};

// Create new User.
export let createUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Create user");
};

// Update new User.
export let updateUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Update user");
};

// Delete new User.
export let deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Delete user");
};

// Display detail page for a specific User.
export let getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersList = User.find({}, "email displayName").exec();
      res.json(await usersList);
    } catch (err) {
      return next(err);
    }
};
