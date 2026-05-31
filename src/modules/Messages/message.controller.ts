import type { Request, Response, NextFunction } from "express";
import type { IMessageController } from "./message.types.ts";
import { messageService } from "./message.service.ts";

export const messageController: IMessageController = {
    update: async (req, res, next) => {
        try {
            const messageId = Number(req.params.messageId);
            const result = await messageService.update(messageId, req.body.text, Number(res.locals.userId));
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
            const skip = Number(req.query.skip ?? 0);
            const take = Number(req.query.take ?? 20);
            const result = await messageService.getByChat(chatId, skip, take);
            res.locals.data = result;
            res.locals.succsesStatus = 200;
            return next();
        } catch (error) {
            res.locals.data = `${error}|500`;
            return next();
        }
    }
};

export default messageController;
