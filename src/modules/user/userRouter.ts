import { Router } from "express";
// import passport from "passport";
import * as auth from "../auth/authMiddleware";
// Require controller modules.
import * as userController from "./userController";

const userRouter = Router();

// GET list of all user.
userRouter.get("/", auth.protectedRoute, userController.getUsers);

// Create new User.
userRouter.post("/", userController.createUser);

// Update a User.
userRouter.put("/:id", auth.protectedRoute, userController.updateUser);

// Delete a User.
userRouter.delete("/:id", auth.protectedRoute, userController.deleteUser);

// GET details of a specific user
userRouter.get("/:id", auth.protectedRoute, userController.getUser);

export { userRouter };
