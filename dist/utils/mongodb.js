"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Set up mongoose connection
const mongoose_1 = __importDefault(require("mongoose"));
const conf = __importStar(require("./conf"));
const mongoDB = "mongodb://127.0.0.1:27017/" + conf.appName;
mongoose_1.default.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
mongoose_1.default.Promise = global.Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
//# sourceMappingURL=mongodb.js.map