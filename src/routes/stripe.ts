import express from "express";
import paymentController from "../controllers/paymentController";
const router = express.Router()


router.post("/payment", paymentController.handlePayment)
router.get("/config", paymentController.StripeConfig)
router.post("/payment-intent", paymentController.paymentIntent)


export default router;