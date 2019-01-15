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
const usersRouter = express_1.Router();
exports.usersRouter = usersRouter;
// Require controller modules.
const userController = __importStar(require("../controllers/userController"));
// GET list of all user.
usersRouter.get("/", userController.getUsers);
// Create new User.
usersRouter.post("/", userController.createUser);
// Update a User.
usersRouter.put("/:id", userController.updateUser);
// Delete a User.
usersRouter.delete("/:id", userController.deleteUser);
// GET details of a specific user
usersRouter.get("/:id", userController.getUser);
//# sourceMappingURL=users.js.map