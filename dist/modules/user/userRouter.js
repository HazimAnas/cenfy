"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Require controller modules.
const userController = __importStar(require("./userController"));
const userRouter = express_1.Router();
exports.userRouter = userRouter;
// GET list of all user.
userRouter.get("/", userController.getUsers);
// Create new User.
userRouter.post("/", userController.createUser);
// Update a User.
userRouter.put("/:id", userController.updateUser);
// Delete a User.
userRouter.delete("/:id", userController.deleteUser);
// GET details of a specific user
userRouter.get("/:id", userController.getUser);
//# sourceMappingURL=userRouter.js.map