"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
// Display list of all User.
exports.user_list = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    /*User.find({}, 'email displayName')
      .exec().then( function (listUsers) {
          res.json(listUsers);
      }).catch(next);*/
    try {
        const listUsers = user_1.default.find({}, "email displayName").exec();
        res.json(yield listUsers);
    }
    catch (err) {
        return next(err);
    }
});
// Display detail page for a specific User.
exports.user_detail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const listUsers = user_1.default.find({}, "email displayName").exec();
        res.json(yield listUsers);
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=userController.js.map