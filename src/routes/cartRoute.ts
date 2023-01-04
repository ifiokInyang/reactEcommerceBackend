import express from "express";
import cartController from "../controllers/cartController";
import Authorize from "../middlewares/auth";

const router = express.Router()

//cart is not protected because anyone can create cart
router.post("/create", Authorize.verifyToken, cartController.createCart)
router.put("/update/:id", Authorize.verifyAndAuthorize, cartController.updateCart)
router.delete("/delete/:id", Authorize.verifyAndAuthorize, cartController.deleteCart)
router.get("/find/:userId", Authorize.verifyAndAuthorize, cartController.getCartProductsByUserId)



//ADMIN
router.get("/get-all-cart-products", Authorize.verifyAndAdmin, cartController.getAllCartProducts)



export default router;