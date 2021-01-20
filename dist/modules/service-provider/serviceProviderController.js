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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePicture = exports.searchServiceProvider = exports.getServiceProvider = exports.deleteServiceProvider = exports.updateServiceProvider = exports.createServiceProvider = exports.getServiceProviders = void 0;
const multer_1 = __importDefault(require("multer"));
const elastic_1 = require("../../utils/elastic");
const userModel_1 = require("../user/userModel");
// import * as mongoose from "mongoose";
const serviceProviderModel_1 = require("./serviceProviderModel");
// Display list of all Service Provider.
exports.getServiceProviders = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield elastic_1.elasticClient.search({
            index: "sp",
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        // const serviceProviderList = await ServiceProvider.find({}, "").exec();
        responseHandling(response, res);
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
        yield elastic_1.elasticClient.index(indexserviceProvider);
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
        const indexserviceProvider = {
            index: "sp",
            id: serviceProvider._id,
            body: {
                displayName: serviceProvider.displayName,
                categories: serviceProvider.categories,
                address: serviceProvider.address,
                status: serviceProvider.status,
                dateCreated: serviceProvider.status,
                statistics: serviceProvider.statistics,
                customers: serviceProvider.customers
            }
        };
        yield elastic_1.elasticClient.index(indexserviceProvider);
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
// Display detail page for a specific Service Provider.
exports.searchServiceProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield elastic_1.elasticClient.search({
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
                        ]
                    }
                }
            }
        });
        responseHandling(response, res);
    }
    catch (err) {
        return next(err);
    }
});
exports.uploadProfilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fs = require("fs"), dirPath = "./public/data/uploads/" + req.params.id + "/";
    // Create directory if directory does not exist.
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.log(`Error creating directory: ${err}`);
        }
        // Directory now exists.
    });
    const storage = multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "./public/data/uploads/" + req.params.id + "/");
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const upload = multer_1.default({ storage }).any();
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            // req.files.forEach( function(f) {
            // console.log(f);
            // and move file to final destination...
            // });
            res.end("File has been uploaded");
        }
    });
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