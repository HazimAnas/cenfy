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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Require controller modules.
const userController = __importStar(require("../controllers/userController"));
// GET list of all user.
router.get("/", userController.user_list);
// GET details of a specific user
router.get("/:id", userController.user_detail);
exports.default = router;
//# sourceMappingURL=users.js.map