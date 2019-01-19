import { Router } from "express";
// Require controller modules.
import * as userController from "./userController";

const userRouter = Router();

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

export { userRouter };
