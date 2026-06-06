import express from "express";
import { chatController } from "./chat.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import multer from 'multer';
import { procImgMiddleware, uploadMiddleware } from "../../middlewares/uploadMiddleware.ts";


const router = express.Router()

router.post("", 
    authMiddleware, 
    uploadMiddleware.single("avatar"), 
    procImgMiddleware(300, 80), 
    chatController.create)
router.patch("/:chatId", 
    authMiddleware, 
    uploadMiddleware.single("avatar"), 
    procImgMiddleware(300, 80), 
    chatController.update)
router.delete("/:chatId", authMiddleware, chatController.deleteChat)

router.get("/:userId", authMiddleware, chatController.getByUserId)
router.get("/contact/:friendId", authMiddleware, chatController.getChatByContact)
router.get("/chat/:chatId", authMiddleware, chatController.getChat)

export default router