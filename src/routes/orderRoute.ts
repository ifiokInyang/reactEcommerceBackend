import express from "express";
import orderController from "../controllers/orderController";
import Authorize from "../middlewares/auth";

const router = express.Router()

//cart is not protected because anyone can create cart
router.post("/create", Authorize.verifyToken, orderController.createOrder)
// router.get("/find/:userId", Authorize.verifyAndAuthorize, cartController.getCartProductsByUserId)



//ADMIN
//Only admin can modify the order
router.get("/get-user-orders/:userId", Authorize.verifyAndAuthorize, orderController.getUserOrders)
router.get("/get-all-orders", Authorize.verifyAndAdmin, orderController.getAllOrders)
router.put("/update/:id", Authorize.verifyAndAdmin, orderController.updateOrder)
router.delete("/delete/:id", Authorize.verifyAndAdmin, orderController.deleteOrder)
router.get("/stats", Authorize.verifyAndAdmin, orderController.getMonthlyStats)





export default router;