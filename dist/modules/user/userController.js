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
exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const bcrypt = __importStar(require("bcrypt"));
const userModel_1 = require("./userModel");
// Display list of all User.
exports.getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersList = yield userModel_1.User.find({}, "email username displayName").exec();
        responseHandling(usersList, res);
    }
    catch (err) {
        return next(err);
    }
});
// Create a new User.
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = new userModel_1.User(req.body);
        const createdUser = yield user.save();
        responseHandling(createdUser, res);
    }
    catch (err) {
        return next(err);
    }
});
// Update a User.
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndUpdate(req.params.id, req.body).exec();
        responseHandling(user, res);
    }
    catch (err) {
        return next(err);
    }
});
// Delete a User.
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndDelete(req.params.id).exec();
        responseHandling(user, res);
    }
    catch (err) {
        return next(err);
    }
});
// Display detail page for a specific User.
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.params.id).exec();
        responseHandling(user, res);
    }
    catch (err) {
        return next(err);
    }
});
// wip
function responseHandling(data, res) {
    if (data != null) {
        if (data.password) {
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
//# sourceMappingURL=userController.js.map