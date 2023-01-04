import express from "express";
import userController from "../controllers/userController";

const router = express.Router()




router.post("/register", userController.Register)
router.post("/login", userController.Login)






export default router;