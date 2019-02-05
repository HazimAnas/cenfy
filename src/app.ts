import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as conf from "./utils/conf";

const app = express();
// enable cors
app.use(cors({credentials: true}));
// initialize passport
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize db connection
import "./utils/mongodb";

// Attach all module routers
import * as routers from "./routers";
app.use("/auth", routers.authRouter);
app.use("/users", routers.userRouter);
app.use("/sp", routers.serviceProviderRouter);

app.use((error: Error , req: Request, res: Response, next: NextFunction) => {
  // top level error handler
  res.json({ message: error.message });
});

// Start server
app.listen(conf.port, () =>
  console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`)
);

module.exports = app;
