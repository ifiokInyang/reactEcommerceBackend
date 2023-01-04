"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", userController_1.default.Test);
router.put("/:id", auth_1.default.verifyAndAuthorize, userController_1.default.updateUser);
exports.default = router;
