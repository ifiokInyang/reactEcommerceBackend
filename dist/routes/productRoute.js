"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create", auth_1.default.verifyAndAdmin, productController_1.default.createProduct);
router.put("/update/:id", auth_1.default.verifyAndAdmin, productController_1.default.updateProduct);
router.delete("/delete/:id", auth_1.default.verifyAndAdmin, productController_1.default.deleteProduct);
router.get("/get-all-products", productController_1.default.getAllProducts);
router.get("/find/:id", productController_1.default.getProductById);
exports.default = router;
