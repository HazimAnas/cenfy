import { Router } from "express";
import multer from "multer";
import * as auth from "../auth/authMiddleware";

const serviceProviderRouter = Router();
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./public/data/uploads/image/profile-picture");
     },
    filename(req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({storage});

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

serviceProviderRouter.post("/uploadProfilePicture/:id", auth.protectedRoute, serviceProviderController.uploadProfilePicture);
// POST service Providers image uploads
/*serviceProviderRouter.post("/uploadProfilePicture", auth.protectedRoute, upload.single("upload"), function(req, res) {
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
    console.log(req.file.path);
    return res.send({
      success: true
    });
  }
});
*/
// POST service Providers image uploads
serviceProviderRouter.post("/uploadImage/", auth.protectedRoute, upload.single("upload"), function(req, res) {
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
    console.log(req.file.path);
    return res.send({
      success: true
    });
  }
});

export { serviceProviderRouter };
