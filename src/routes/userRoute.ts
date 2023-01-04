import express, { Request, Response } from "express";
import Controller from "../controllers/userController";
import Authorize from "../middlewares/auth";


const router = express.Router()


router.get("/", Controller.Test)
router.put("/:id", Authorize.verifyAndAuthorize, Controller.updateUser)

export default router;