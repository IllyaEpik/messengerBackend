import express from "express";
import { messageController } from "./message.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import {
	procImagesMiddleware,
	uploadsMiddleware,
} from "../../middlewares/uploadsMiddleware.ts";

const router = express.Router();

router.get("/:chatId", authMiddleware, messageController.getByChat);

router.post(
	"/:chatId",
	authMiddleware,
	uploadsMiddleware.array("images"),
	procImagesMiddleware(300, 80),
	messageController.sendImage,
);

export default router;
