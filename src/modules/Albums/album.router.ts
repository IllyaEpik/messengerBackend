import express from "express";
import { albumController } from "./album.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router()
router.get("/",authMiddleware, albumController.getAlbums)
router.patch("/:id", upload.single('image'), authMiddleware, albumController.updateAlbum)
router.post("/", authMiddleware, albumController.createAlbum)
router.delete("/:id", authMiddleware, albumController.deleteAlbum)

export default router