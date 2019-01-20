import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ServiceProvider } from "./serviceProviderModel";

// Display list of all User.
export let getServiceProviders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProviderList = await ServiceProvider.find({}, "email displayName").exec();
      responseHandling(serviceProviderList, res);
    } catch (err) {
      next(err);
    }
};

// Create a new User.
export let createServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const serviceProvider = new ServiceProvider(req.body);
        const createdserviceProvider = await serviceProvider.save();
        responseHandling(createdserviceProvider, res);
    } catch (err) {
      next(err);
    }
};

// Update a User.
export let updateServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      next(err);
    }
};

// Delete a User.
export let deleteServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      next(err);
    }
};

// Display detail page for a specific User.
export let getServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findById(req.params.id).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      next(err);
    }
};
// wip
function responseHandling(data: any, res: Response) {
  if (data != null) {
    if (data.password) {
      console.log("Delete password " + data.password);
      data = data.toObject();
      delete data.password;
    }
    JSON.stringify(data);
    res.json({status: 200, message: "Successful", data});
  } else {
    res.status(500).json({status: 500, message: "Unsuccessful", data});
  }
}
