import express from "express";
import { messageController } from "./message.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/:chatId", authMiddleware, messageController.getByChat);

export default router;
