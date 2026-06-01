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
router.patch("/", upload.fields([{name:'avatar'},{name:"electronicSignature"}]), authMiddleware, UserController.updateUser)
router.post("/profile", authMiddleware, UserController.createProfile)
router.get("/send/:profile", authMiddleware, UserController.sendFriendRequest)
router.get("/confirm/:fromUserId", authMiddleware, UserController.confirmFriendRequest)
router.get("/friends", authMiddleware, UserController.getFriends)
router.delete("/delete-friend/:friendId", authMiddleware, UserController.deleteFriend)
router.get("/block/:friendId", authMiddleware, UserController.removeRecommendations)
router.get("/friend/:userId", authMiddleware, UserController.getfriendById)
router.get("/all", UserController.getAllUsers)

export default router
