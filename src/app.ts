import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const appName = "cenfy";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Attach all route
import { usersRouter } from "./routes/users";

app.use("/users", usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Set up mongoose connection
import mongoose from "mongoose";
const mongoDB = "mongodb://127.0.0.1:27017/" + appName;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
