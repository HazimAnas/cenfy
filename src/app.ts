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

// headers and content type
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initialize db connection
import "./utils/elastic";
import "./utils/mongodb";

// Attach all module routers
import * as routers from "./routers";
app.use("/auth", routers.authRouter);
app.use("/users", routers.userRouter);
app.use("/sp", routers.serviceProviderRouter);

app.use((error: Error , req: Request, res: Response, next: NextFunction) => {
  // top level error handler
  res.status(500).json({ message: error.message });
});

// Start server
app.listen(conf.port, () =>
  console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`)
);

module.exports = app;
