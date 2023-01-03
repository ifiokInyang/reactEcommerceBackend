import express, { Request, Response } from "express";
import Controller from "../controllers/userController"



const router = express.Router()


router.get("/", Controller.Test)
router.post("/register", Controller.Register)

export default router;