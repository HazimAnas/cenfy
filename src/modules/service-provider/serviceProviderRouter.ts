import { Router } from "express";

const serviceProviderRouter = Router();

// Require controller modules.
import * as serviceProviderController from "./serviceProviderController";

// GET list of all service Provider.
serviceProviderRouter.get("/", serviceProviderController.getServiceProviders);

// Create new service Provider.
serviceProviderRouter.post("/", serviceProviderController.createServiceProvider);

// Update a service Provider.
serviceProviderRouter.put("/:id", serviceProviderController.updateServiceProvider);

// Delete a service Provider.
serviceProviderRouter.delete("/:id", serviceProviderController.deleteServiceProvider);

// GET details of a specific service Provider
serviceProviderRouter.get("/:id", serviceProviderController.getServiceProvider);

export { serviceProviderRouter };
