"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviderRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth = __importStar(require("../auth/authMiddleware"));
const serviceProviderRouter = express_1.Router();
exports.serviceProviderRouter = serviceProviderRouter;
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "./public/data/uploads/image/profile-picture");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer_1.default({ storage });
// Require controller modules.
const serviceProviderController = __importStar(require("./serviceProviderController"));
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
serviceProviderRouter.post("/uploadImage/", auth.protectedRoute, upload.single("upload"), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    console.log("here");
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });
    }
    else {
        console.log("File is available!");
        console.log(req.file.path);
        return res.send({
            success: true
        });
    }
});
//# sourceMappingURL=serviceProviderRouter.js.map