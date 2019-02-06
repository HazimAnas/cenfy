"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth = __importStar(require("../auth/authMiddleware"));
const serviceProviderRouter = express_1.Router();
exports.serviceProviderRouter = serviceProviderRouter;
// Require controller modules.
const serviceProviderController = __importStar(require("./serviceProviderController"));
// GET list of all service Provider.
serviceProviderRouter.get("/", serviceProviderController.getServiceProviders);
// Create new service Provider.
serviceProviderRouter.post("/", serviceProviderController.createServiceProvider);
// Update a service Provider.
serviceProviderRouter.put("/:id", auth.protectedRoute, serviceProviderController.updateServiceProvider);
// Delete a service Provider.
serviceProviderRouter.delete("/:id", auth.protectedRoute, serviceProviderController.deleteServiceProvider);
// GET details of a specific service Provider
serviceProviderRouter.get("/:id", serviceProviderController.getServiceProvider);
//# sourceMappingURL=serviceProviderRouter.js.map