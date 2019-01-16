import bodyParser from "body-parser";
import express from "express";
import { NextFunction, Request, Response } from "express";
import * as conf from "./utils/conf";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize db connection
import "./utils/mongodb";

// Attach all module routers
import * as routers from "./routers";

app.use("/users", routers.userRouter);

app.use(function(error: Error , req: Request, res: Response, next: NextFunction) {
  // Will **not** get called. You'll get Express' default error
  // handler, which returns `error.toString()` in the error body
  console.log("will not print");
  res.json({ message: error.message });
});

// Start server
app.listen(conf.port, () =>
  console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`)
);
