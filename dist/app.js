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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const conf = __importStar(require("./utils/conf"));
const app = express_1.default();
// enable cors
app.use(cors_1.default({ credentials: true }));
// initialize passport
app.use(passport_1.default.initialize());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Initialize db connection
require("./utils/mongodb");
// Attach all module routers
const routers = __importStar(require("./routers"));
app.use("/auth", routers.authRouter);
app.use("/users", routers.userRouter);
app.use("/sp", routers.serviceProviderRouter);
app.use((error, req, res, next) => {
    // top level error handler
    res.status(500).json({ message: error.message });
});
// Start server
app.listen(conf.port, () => console.log(`Example app listening on port ${conf.port}! with ENV ${app.settings.env}!`));
module.exports = app;
//# sourceMappingURL=app.js.map