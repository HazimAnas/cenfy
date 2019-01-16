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
exports.getUsers = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const usersList = yield userModel_1.User.find({}, "email displayName").exec();
        responseHandling(usersList, res);
    }
    catch (err) {
        return next(err);
    }
});
// Create a new User.
exports.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send("Create user");
});
// Update a User.
exports.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send("Update user");
});
// Delete a User.
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndDelete(req.params.id).exec();
        responseHandling(user, res);
    }
    catch (err) {
        next(err);
    }
});
// Display detail page for a specific User.
exports.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.params.id, "email displayName").exec();
        responseHandling(user, res);
    }
    catch (err) {
        next(err);
    }
});
function responseHandling(data, res) {
    JSON.stringify(data);
    if (data != null) {
        if (data.password) {
            delete data.password;
        }
        res.json({ status: 200, message: "Successful", data });
    }
    else {
        res.status(500).json({ status: 500, message: "Unsuccessful", data });
    }
}
//# sourceMappingURL=userController.js.map