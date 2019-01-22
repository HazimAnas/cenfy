"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const authController = __importStar(require("./authController"));
const authRouter = express.Router();
exports.authRouter = authRouter;
authRouter.post("/login", authController.login);
//# sourceMappingURL=authRouter.js.map