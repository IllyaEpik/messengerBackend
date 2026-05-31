import type { Request, Response, NextFunction } from "express";
import type{ IChatController } from "./chat.types.ts";
import { chatService } from "./chat.service.ts";



export const chatController: IChatController = {
    create: async (req, res, next) => {
        try {
            const result = await chatService.createChat(req.body);
            res.locals.data = result;
            res.locals.succsesStatus = 201;
            return next();
        } catch (error) {
            res.locals.data = "not found|404"
            return next();
        }
    },

    update: async (req, res, next: NextFunction) => {
        try {
            const result = await chatService.updateChat(req.body,Number(req.params.chatId));
            res.locals.data = result;
            res.locals.succsesStatus =  200;
            return next();
        } catch (error) {
            res.locals.data = "not found|404"

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
            res.locals.data = "not found|404"
            return next();
        }
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
