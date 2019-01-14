import express from "express";
const router = express.Router();

// Require controller modules.
import * as userController from "../controllers/userController";

// GET list of all user.
router.get("/", userController.user_list);

// GET details of a specific user
router.get("/:id", userController.user_detail);

export default router;
