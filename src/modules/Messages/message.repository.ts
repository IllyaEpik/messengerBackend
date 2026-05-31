import type { IMessageRepository, IMessageCreate, IMessageUpdate } from "./message.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const messageRepository: IMessageRepository = {
    create: async (data) => {
        const message = await Prisma.message.create({
            data,
            include: {
                sender: true,
                readers: true,
                images: true,
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
                images: true,
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
        const messages = await Prisma.message.findMany({
            where: { chatId },
            orderBy: { created_at: "desc" },
            skip,
            take,
            include: {
                sender: true,
                images: true,
                _count: {
                    select:{
                        readers: true
                    }
                },
                readers:true
            },
            
        });
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
                images: true,
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
