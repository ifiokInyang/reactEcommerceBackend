"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
//cart is not protected because anyone can create cart
router.post("/create", auth_1.default.verifyToken, orderController_1.default.createOrder);
// router.get("/find/:userId", Authorize.verifyAndAuthorize, cartController.getCartProductsByUserId)
//ADMIN
//Only admin can modify the order
router.get("/get-user-orders/:userId", auth_1.default.verifyAndAuthorize, orderController_1.default.getUserOrders);
router.get("/get-all-orders", auth_1.default.verifyAndAdmin, orderController_1.default.getAllOrders);
router.put("/update/:id", auth_1.default.verifyAndAdmin, orderController_1.default.updateOrder);
router.delete("/delete/:id", auth_1.default.verifyAndAdmin, orderController_1.default.deleteOrder);
router.get("/stats", auth_1.default.verifyAndAdmin, orderController_1.default.getMonthlyStats);
exports.default = router;
