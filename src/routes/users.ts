import { Router } from "express";

const usersRouter = Router();

// Require controller modules.
import * as userController from "../controllers/userController";

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

export { usersRouter };
