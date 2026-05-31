import type { IChatRepository } from "./chat.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const chatRepository: IChatRepository = {
    create: async (data) => {
        try {
            
            const chat = await Prisma.chat.create({
                data,
                include: {
                    participants: {
                        include: {
                            user: true,
                        }
                    },
                    admin: true,
                }
            });
            return chat;
        } catch (error) {
            throw error;
        }
    },

    update: async (data, chatId) => {
        try {
            const chat = await Prisma.chat.update({
                where: { id: chatId },
                data,
                include: {
                    participants: {
                        include: {
                            user: true,
                        }
                    },
                    admin: true,
                }
            });
            return chat;
        } catch (error) {
            throw error;
        }
    },

    getByUserId: async (userId) => {
        try {
            const chats = await Prisma.chat.findMany({
                where: {
                    participants: {
                        some: {
                            userId,
                        }
                    }
                },
                include: {
                    participants: {
                        include: {
                            user: true,
                        }
                    },
                    admin: true,
                }
            });
            return chats;
        } catch (error) {
            throw error;
        }
    },

    isUserInChat: async (chatId, userId) => {
        try {
            const userInChat = await Prisma.chat.findFirst({
                where: {
                    id: chatId,
                    participants: {
                        some: {
                            userId,
                        }
                    }
                }
            });
            return !!userInChat;
        } catch (error) {
            throw error;
        }
    }
}