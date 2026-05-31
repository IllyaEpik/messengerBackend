import express from "express";
import { chatController } from "./chat.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import multer from 'multer';
import { uploadsMiddleware, procImagesMiddleware } from "../../middlewares/uploadsMiddleware.ts";


const router = express.Router()

router.post("", 
    authMiddleware, 
    uploadsMiddleware.single("avatar"), 
    procImagesMiddleware(300, 100), 
    chatController.create)
router.patch("/:chatId", 
    authMiddleware, 
    uploadsMiddleware.single("avatar"), 
    procImagesMiddleware(300, 100), 
    chatController.update)
// router.delete("/:id", authMiddleware, postController.delete)

router.get("/:userId", authMiddleware, chatController.getByUserId)

export default router