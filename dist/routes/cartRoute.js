"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../controllers/cartController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
//cart is not protected because anyone can create cart
router.post("/create", auth_1.default.verifyToken, cartController_1.default.createCart);
router.put("/update/:id", auth_1.default.verifyAndAuthorize, cartController_1.default.updateCart);
router.delete("/delete/:id", auth_1.default.verifyAndAuthorize, cartController_1.default.deleteCart);
router.get("/find/:userId", auth_1.default.verifyAndAuthorize, cartController_1.default.getCartProductsByUserId);
//ADMIN
router.get("/get-all-cart-products", auth_1.default.verifyAndAdmin, cartController_1.default.getAllCartProducts);
exports.default = router;
