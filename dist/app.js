"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const appName = "cenfy";
// Attach all route
const users_1 = __importDefault(require("./routes/users"));
app.use("/users", users_1.default);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// Set up mongoose connection
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB = "mongodb://127.0.0.1:27017/" + appName;
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = global.Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
//# sourceMappingURL=app.js.map