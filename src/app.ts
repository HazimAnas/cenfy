import bodyParser from "body-parser";
import express from "express";
import * as conf from "./utils/conf";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize db connection
import "./utils/mongodb";

// Attach all module routers
import * as routers from "./routers";

app.use("/users", routers.userRouter);

// Start server
app.listen(conf.port, () =>
  console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`)
);
