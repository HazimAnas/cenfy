// Set up mongoose connection
import mongoose from "mongoose";
import * as conf from "./conf";

const mongoDB = "mongodb://127.0.0.1:27017/" + conf.appName;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
