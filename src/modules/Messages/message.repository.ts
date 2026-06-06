import type { IMessageRepository, IMessageCreate, IMessageUpdate } from "./message.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const messageRepository: IMessageRepository = {
    create: async (data) => {
        const message = await Prisma.message.create({
            data,
            include: {
                sender: true,
                readers: true,
                messageImage: true,
                chat: true,
                _count: {
                    select: {
                        readers: true
                    }
                }
            }
        });
        return message;
    },

    update: async (id, data) => {
        const message = await Prisma.message.update({
            where: { id },
            data,
            include: {
                sender: true,
                readers: true,
                messageImage: true,
                chat: true,
                _count: {
                    select: {
                        readers: true
                    }
                }
            }
        });
        return message;
    },

    getByChat: async (chatId, skip = 0, take = 20) => {
        console.log(chatId, skip, take, "getByChat");
        const messages = await Prisma.message.findMany({
            where: { chatId },
            orderBy: { created_at: "desc" },
            skip:0,
            take:40,
            include: {
                sender: true,
                messageImage: true,
                _count: {
                    select:{
                        readers: true
                    }
                },
                readers:true
            },
            
        });
        console.log(messages.length, "messages");
        return messages;
    },

    addReader: async (messageId, userId) => {
        const message = await Prisma.message.update({
            where: { id: messageId },
            data: {
                readers: {
                    connect: { id: userId },
                },
            },
            include: {
                sender: true,
                readers: true,
                messageImage: true,
                chat: true,
                _count:{
                    select: {
                        readers: true
                    }
                }
            }
        });
        return message;
    }
};
