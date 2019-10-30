"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../user/userModel");
// import * as mongoose from "mongoose";
const serviceProviderModel_1 = require("./serviceProviderModel");
// Display list of all Service Provider.
exports.getServiceProviders = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceProviderList = yield serviceProviderModel_1.ServiceProvider.find({}, "").exec();
        responseHandling(serviceProviderList, res);
    }
    catch (err) {
        return next(err);
    }
});
// Create a new Service Provider.
exports.createServiceProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.body.user = new mongoose.Schema.Types.ObjectId(req.body.user);
        const serviceProvider = new serviceProviderModel_1.ServiceProvider(req.body);
        const createdserviceProvider = yield serviceProvider.save();
        const user = yield userModel_1.User.findById(req.body.user).exec();
        user.serviceProvider = createdserviceProvider._id;
        yield user.save();
        responseHandling(createdserviceProvider, res);
    }
    catch (err) {
        return next(err);
    }
});
// Update a Service Provider.
exports.updateServiceProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        return next(err);
    }
});
// Delete a Service Provider.
exports.deleteServiceProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findByIdAndDelete(req.params.id).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        return next(err);
    }
});
// Display detail page for a specific Service Provider.
exports.getServiceProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findById(req.params.id).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        return next(err);
    }
});
// wip
function responseHandling(data, res) {
    if (data != null) {
        if (data.password) {
            console.log("Delete password " + data.password);
            data = data.toObject();
            delete data.password;
        }
        JSON.stringify(data);
        res.status(200).json({ status: 200, message: "Successful", data });
    }
    else {
        res.status(500).json({ status: 500, message: "Unsuccessful", data });
    }
}
//# sourceMappingURL=serviceProviderController.js.map