"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("./userModel");
// Display list of all User.
exports.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const usersList = userModel_1.User.find({}, "email displayName").exec();
        res.json(yield usersList);
    }
    catch (err) {
        return next(err);
    }
});
// Create new User.
exports.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send("Create user");
});
// Update new User.
exports.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send("Update user");
});
// Delete new User.
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send("Delete user");
});
// Display detail page for a specific User.
exports.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const usersList = userModel_1.User.find({}, "email displayName").exec();
        res.json(yield usersList);
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=userController.js.map