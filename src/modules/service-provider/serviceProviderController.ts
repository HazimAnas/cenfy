import { NextFunction, Request, Response } from "express";
import multer from "multer";
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
          match_all: {}
          }
        }
      });
      // const serviceProviderList = await ServiceProvider.find({}, "").exec();
      responseHandling(response, res);
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
            address: createdserviceProvider.address,
            status: createdserviceProvider.status,
            dateCreated: createdserviceProvider.dateCreated,
            statistics: createdserviceProvider.statistics,
            customers: createdserviceProvider.customers,
            followers: createdserviceProvider.followers
          }
        };
        await elasticClient.index(indexserviceProvider);
        responseHandling(createdserviceProvider, res);
    } catch (err) {
      return next(err);
    }
};

// Update a Service Provider.
export let updateServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
      const indexserviceProvider = {
        index: "sp",
        id: serviceProvider!._id,
        body: {
            displayName: serviceProvider!.displayName,
            categories: serviceProvider!.categories,
            address: serviceProvider!.address,
            status: serviceProvider!.status,
            dateCreated: serviceProvider!.status,
            statistics: serviceProvider!.statistics,
            customers: serviceProvider!.customers
          }
      };
      await elasticClient.index(indexserviceProvider);
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
          bool: {
            should: [
              {
                match: {
                  displayName: req.params.search,
                }
              },
              {
                match: {
                "categories.name": req.params.search,
                }
              }
            ]}
          }
        }
      });
        responseHandling(response, res);
    } catch (err) {
      return next(err);
    }
};

export let uploadProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  const
    fs = require("fs"),
    dirPath = "./public/data/uploads/" + req.params.id + "/";

  // Create directory if directory does not exist.
  fs.mkdir(dirPath, {recursive: true}, (err: any) => {
    if (err) { console.log(`Error creating directory: ${err}`); }
    // Directory now exists.
  });

  const storage = multer.diskStorage({
      destination(req, file, cb) {
          cb(null, "./public/data/uploads/" + req.params.id + "/");
       },
      filename(req, file, cb) {
          cb(null , file.originalname);
      }
  });

  const upload = multer({ storage}).any();

  upload(req, res, function(err: any) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
           console.log(req.body);
           // req.files.forEach( function(f) {
             // console.log(f);
             // and move file to final destination...
           // });
           res.end("File has been uploaded");
        }
    });
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
