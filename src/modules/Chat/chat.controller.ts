import type { Request, Response, NextFunction } from "express";
import type { IChatController } from "./chat.types.ts";
import { chatService } from "./chat.service.ts";

export const chatController: IChatController = {
	create: async (req, res, next) => {
		try {
			const userId = Number(res.locals.userId);
			const file = req.file?.filename;
			const result = await chatService.createChat(req.body, userId, file);
			res.locals.data = result;
			res.locals.succsesStatus = 201;
			return next();
		} catch (error) {
			res.locals.data = "not found|404";
			return next();
		}
	},

	update: async (req, res, next: NextFunction) => {
		try {
			const file = req.file?.filename;
			console.log(file);
			const result = await chatService.updateChat(
				req.body,
				Number(req.params.chatId),
				file,
			);
			res.locals.data = result;
			res.locals.succsesStatus = 200;
			return next();
		} catch (error) {
			res.locals.data = "not found|404";

			return next();
		}
	},

	getByUserId: async (req, res, next) => {
		try {
			const userId = Number(res.locals.userId);
			const result = await chatService.getByUserId(userId);
			res.locals.data = result;
			res.locals.succsesStatus = 200;
			return next();
		} catch (error) {
			res.locals.data = "not found|404";
			return next();
		}
	},
	async getChatByContact(req, res, next) {
		const userId = Number(res.locals.userId);
		const friendId = Number(req.params.friendId);
		const result = await chatService.getChatByContact(userId, friendId);
		res.locals.data = result;
		res.locals.succsesStatus = 200;
		return next();
	},
	async getChat(req, res, next) {
		const userId = Number(res.locals.userId);
		const chatId = Number(req.params.chatId);
		const result = await chatService.getChat(userId, chatId);
		console.log(result);
		res.locals.data = result;
		res.locals.succsesStatus = 200;
		return next();
	},
	async deleteChat(req, res, next) {
		const userId = Number(res.locals.userId);
		const chatId = Number(req.params.chatId);
		console.log(userId, chatId, "3123321132132ddddddddddddd");
		const result = await chatService.deleteChat(userId, chatId);
		res.locals.data = result;
		res.locals.succsesStatus = 204;
		return next();
	},
	// isUserInChat: async (req: Request<any, any, any, { chatId: number; userId: number }>, res: Response, next: NextFunction) => {
	//     try {
	//         const chatId = Number(req.params.chatId ?? req.query.chatId ?? 0);
	//         const userId = Number(req.params.userId ?? req.query.userId ?? 0);
	//         const result = await chatService.isUserInChat(chatId, userId);
	//         const parsed = parseServiceResult(result);
	//         res.locals.data = parsed.data ?? { isInChat: result };
	//         res.locals.succsesStatus = parsed.status ?? 200;
	//         return next();
	//     } catch (error) {
	//         res.locals.data = { message: "not found" };
	//         res.locals.succsesStatus = 404;
	//         return next();
	//     }
	// }
};

export default chatController;
