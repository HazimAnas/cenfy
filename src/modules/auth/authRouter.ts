import * as express from "express";
import * as authController from "./authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);

export { authRouter };
