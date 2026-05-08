import express from "express";
import { postController } from "./post.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import multer from 'multer';
import { uploadsMiddleware, procImagesMiddleware } from "../../middlewares/uploadsMiddleware.ts";


const router = express.Router()

router.post("", 
    authMiddleware, 
    uploadsMiddleware.array("images"), 
    procImagesMiddleware(300, 100), 
    postController.create)
router.patch("/:id", 
    authMiddleware, 
    uploadsMiddleware.array("images"), 
    procImagesMiddleware(300, 100), 
    postController.update)
router.delete("/:id", authMiddleware, postController.delete)

router.get("/act/:id", authMiddleware, postController.action)
router.get("", authMiddleware, postController.get)
router.get("/me", authMiddleware, postController.getByUser)

export default router