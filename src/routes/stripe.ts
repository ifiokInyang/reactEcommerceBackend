import express from "express";
import paymentController from "../controllers/paymentController";
const router = express.Router()


router.post("/payment", paymentController.handlePayment)


export default router;