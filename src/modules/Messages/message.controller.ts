import type { Request, Response, NextFunction } from "express";
import type { IMessageController } from "./message.types.ts";
import { messageService } from "./message.service.ts";
import { MessageSocketController } from "./message.socket.controller.ts";
import { SocketManager } from "../Socket/socket.manager.ts";

export const messageController: IMessageController = {
	update: async (req, res, next) => {
		try {
			const messageId = Number(req.params.messageId);
			const result = await messageService.update(
				messageId,
				req.body.text,
				Number(res.locals.userId),
			);
			res.locals.data = result;
			res.locals.succsesStatus = 200;
			return next();
		} catch (error) {
			res.locals.data = "idk|404";
			return next();
		}
	},

	getByChat: async (req, res, next) => {
		try {
			const chatId = Number(req.params.chatId);
			const userId = Number(res.locals.userId);
			const skip = Number(req.query.skip ?? 0);
			const take = Number(req.query.take ?? 20);
			const result = await messageService.getByChat(
				chatId,
				userId,
				skip,
				take,
			);
			res.locals.data = result;
			res.locals.succsesStatus = 200;
			return next();
		} catch (error) {
			res.locals.data = `${error}|500`;
			return next();
		}
	},
	async sendImage(req, res, next) {
		try {
			const chatId = Number(req.params.chatId);
			const userId = Number(res.locals.userId);
			const text = req.body.text;
			const files =
				req.files && req.files.length
					? ((req.files as Express.Multer.File[]) || []).map(
							(file) => file.filename,
						)
					: [];
			const result = await messageService.create(
				{
					text,
					chatId,
					images: files,
				},
				userId,
			);
			if (SocketManager.socketServer && typeof result !== "string") {
				MessageSocketController.newMessage(
					SocketManager.socketServer,
					result,
				);
			}
			res.locals.data = result;
			res.locals.succsesStatus = 201;
			return next();
		} catch (error) {
			res.locals.data = `${error}|500`;
			return next();
		}
	},
};

export default messageController;
