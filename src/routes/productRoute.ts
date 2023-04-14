import express from "express";
import productController from "../controllers/productController";
import Authorize from "../middlewares/auth"

const router = express.Router()


router.post("/create", Authorize.verifyAndAdmin, productController.createProduct)
router.put("/update/:id", Authorize.verifyAndAdmin, productController.updateProduct)
router.delete("/delete/:id", Authorize.verifyAndAdmin, productController.deleteProduct)
router.get("/", productController.getAllProducts)
router.get("/find/:id", productController.getProductById)





export default router;