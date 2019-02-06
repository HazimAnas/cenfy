import { NextFunction, Request, Response } from "express";
// import * as mongoose from "mongoose";
import { ServiceProvider } from "./serviceProviderModel";

// Display list of all Service Provider.
export let getServiceProviders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProviderList = await ServiceProvider.find({}, "").exec();
      responseHandling(serviceProviderList, res);
    } catch (err) {
      return next(err);
    }
};

// Create a new Service Provider.
export let createServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.body.user = new mongoose.Schema.Types.ObjectId(req.body.user);
        const serviceProvider = new ServiceProvider(req.body);
        const createdserviceProvider = await serviceProvider.save();
        responseHandling(createdserviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Update a Service Provider.
export let updateServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Delete a Service Provider.
export let deleteServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Display detail page for a specific Service Provider.
export let getServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findById(req.params.id).populate("user").exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      return next(err);
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
