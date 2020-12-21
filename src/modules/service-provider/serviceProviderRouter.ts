import { Router } from "express";
import multer from "multer";
import * as auth from "../auth/authMiddleware";

const serviceProviderRouter = Router();
const upload = multer({ dest: "./public/data/uploads/" });

// Require controller modules.
import * as serviceProviderController from "./serviceProviderController";

// GET list of all service Provider.
serviceProviderRouter.get("/", serviceProviderController.getServiceProviders);

// Create new service Provider.
serviceProviderRouter.post("/", auth.protectedRoute, serviceProviderController.createServiceProvider);

// Update a service Provider.
serviceProviderRouter.put("/:id", auth.protectedRoute, serviceProviderController.updateServiceProvider);

// Delete a service Provider.
serviceProviderRouter.delete("/:id", auth.protectedRoute, serviceProviderController.deleteServiceProvider);

// GET details of a specific service Provider
serviceProviderRouter.get("/:id", serviceProviderController.getServiceProvider);

// GET service Providers matching search queries
serviceProviderRouter.get("/browse/:search", serviceProviderController.searchServiceProvider);

// POST service Providers image uploads
serviceProviderRouter.post("/uploadImage", upload.single("upload"), function(req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any
   console.log("here");
   if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log("File is available!");
    return res.send({
      success: true
    });
  }
});

export { serviceProviderRouter };
