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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviderRouter = void 0;
const express_1 = require("express");
const auth = __importStar(require("../auth/authMiddleware"));
const serviceProviderRouter = express_1.Router();
exports.serviceProviderRouter = serviceProviderRouter;
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
// GET details of a specific service Provider
serviceProviderRouter.get("/browse/:search", serviceProviderController.searchServiceProvider);
//# sourceMappingURL=serviceProviderRouter.js.map