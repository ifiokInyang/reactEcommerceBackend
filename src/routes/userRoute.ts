import express, { Request, Response } from "express";
import Controller from "../controllers/userController";
import Authorize from "../middlewares/auth";


const router = express.Router()

router.put("/:id", Authorize.verifyAndAuthorize, Controller.updateUser)
router.delete("/:id", Authorize.verifyAndAuthorize, Controller.deleteUser)
router.get("/find/:id", Authorize.verifyAndAdmin, Controller.getUserById)
router.get("/get-users", Authorize.verifyAndAdmin, Controller.getAllUsers)
router.get("/stats", Authorize.verifyAndAdmin, Controller.getUserStats)

export default router;