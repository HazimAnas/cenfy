"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const serviceProviderModel_1 = require("./serviceProviderModel");
// Display list of all User.
exports.getServiceProviders = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serviceProviderList = yield serviceProviderModel_1.ServiceProvider.find({}, "email displayName").exec();
        responseHandling(serviceProviderList, res);
    }
    catch (err) {
        next(err);
    }
});
// Create a new User.
exports.createServiceProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const serviceProvider = new serviceProviderModel_1.ServiceProvider(req.body);
        const createdserviceProvider = yield serviceProvider.save();
        responseHandling(createdserviceProvider, res);
    }
    catch (err) {
        next(err);
    }
});
// Update a User.
exports.updateServiceProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findByIdAndUpdate(req.params.id, req.body).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        next(err);
    }
});
// Delete a User.
exports.deleteServiceProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findByIdAndDelete(req.params.id).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        next(err);
    }
});
// Display detail page for a specific User.
exports.getServiceProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serviceProvider = yield serviceProviderModel_1.ServiceProvider.findById(req.params.id).exec();
        responseHandling(serviceProvider, res);
    }
    catch (err) {
        next(err);
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
        res.json({ status: 200, message: "Successful", data });
    }
    else {
        res.status(500).json({ status: 500, message: "Unsuccessful", data });
    }
}
//# sourceMappingURL=serviceProviderController.js.map