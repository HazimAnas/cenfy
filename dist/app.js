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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const conf = __importStar(require("./utils/conf"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Initialize db connection
require("./utils/mongodb");
// Attach all module routers
const routers = __importStar(require("./routers"));
app.use("/users", routers.userRouter);
app.use(function (error, req, res, next) {
    // Will **not** get called. You'll get Express' default error
    // handler, which returns `error.toString()` in the error body
    console.log("will not print");
    res.json({ message: error.message });
});
// Start server
app.listen(conf.port, () => console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`));
//# sourceMappingURL=app.js.map