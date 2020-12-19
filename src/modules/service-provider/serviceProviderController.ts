import { NextFunction, Request, Response } from "express";
import { elasticClient } from "../../utils/elastic";
import { User } from "../user/userModel";
// import * as mongoose from "mongoose";
import { ServiceProvider } from "./serviceProviderModel";

// Display list of all Service Provider.
export let getServiceProviders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await elasticClient.search({
        index: "sp",
        body: {
        query: {
          match: { status: false }
          }
        }
      });
      console.log(JSON.stringify(response.body));
      console.log(response);
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
        const user = await User.findById(req.body.user).exec();
        user!.serviceProvider = createdserviceProvider._id;
        await user!.save();
        const indexserviceProvider = {
          index: "sp",
          id: createdserviceProvider._id,
          type: "_doc",
          body: {
            displayName: createdserviceProvider.displayName,
            categories: createdserviceProvider.categories,
            status: createdserviceProvider.status,
            dateCreated: createdserviceProvider.status,
            statistics: createdserviceProvider.statistics,
            customers: createdserviceProvider.customers
          }
        };
        elasticClient.index(indexserviceProvider);
        responseHandling(createdserviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Update a Service Provider.
export let updateServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    console.log("here");
    try {
      const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
      const indexserviceProvider = {
        index: "sp",
        id: serviceProvider!._id,
        type: "_doc",
        body: {
          displayName: serviceProvider!.displayName,
          categories: serviceProvider!.categories,
          status: serviceProvider!.status,
          dateCreated: serviceProvider!.status,
          statistics: serviceProvider!.statistics,
          customers: serviceProvider!.customers
        }
      };
      elasticClient.update(indexserviceProvider);
      responseHandling(serviceProvider, res);
      console.log(res);
    } catch (err) {
      console.log(err);
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
      const serviceProvider = await ServiceProvider.findById(req.params.id).exec();
      responseHandling(serviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Display detail page for a specific Service Provider.
export let searchServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await elasticClient.search({
        index: "sp",
        body: {
        query: {
          match: { displayName: req.params.search }
          }
        }
      });
      console.log(JSON.stringify(response.body));
      console.log(response);
      responseHandling(response, res);
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
    res.status(200).json({status: 200, message: "Successful", data});
  } else {
    res.status(500).json({status: 500, message: "Unsuccessful", data});
  }
}
