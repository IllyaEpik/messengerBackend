import express from "express";
import { UserController } from "./user.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router()
router.post("/registration", UserController.registation)
router.get("/registrationsecond/:code", UserController.RegistrationSecondPhase)
router.post("/login", UserController.login)
router.get("/me",authMiddleware, UserController.me)
router.patch("/", upload.single('avatar'), authMiddleware, UserController.updateUser)
router.post("/profile", authMiddleware, UserController.createProfile)
router.post("/avatar", authMiddleware, UserController.createProfile)

export default router
//     "name":"ok",