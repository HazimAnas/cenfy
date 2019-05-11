import { Router } from "express";
import * as auth from "../auth/authMiddleware";

const serviceProviderRouter = Router();

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

export { serviceProviderRouter };
