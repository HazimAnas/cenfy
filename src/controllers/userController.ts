import { NextFunction, Request, Response } from "express";
import User from "../models/user";

// Display list of all User.
export let user_list = async (req: Request, res: Response, next: Function) => {
    /*User.find({}, 'email displayName')
      .exec().then( function (listUsers) {
          res.json(listUsers);
      }).catch(next);*/
    try {
      const listUsers = User.find({}, "email displayName").exec();
      res.json(await listUsers);
    } catch (err) {
      return next(err);
    }
};

// Display detail page for a specific User.
export let user_detail = async (req: Request, res: Response, next: Function) => {
    try {
      const listUsers = User.find({}, "email displayName").exec();
      res.json(await listUsers);
    } catch (err) {
      return next(err);
    }
};
