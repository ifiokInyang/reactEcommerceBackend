"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const router = express_1.default.Router();
router.post("/payment", paymentController_1.default.handlePayment);
router.get("/config", paymentController_1.default.StripeConfig);
router.post("/payment-intent", paymentController_1.default.paymentIntent);
exports.default = router;
