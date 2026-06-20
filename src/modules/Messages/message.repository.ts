import type {
	IMessageRepository,
	IMessageCreate,
	IMessageUpdate,
} from "./message.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const messageRepository: IMessageRepository = {
	create: async (data) => {
		const message = await Prisma.message.create({
			data,
			include: {
				sender: {
					select: {
						username: true,
						profile: {
							select: {
								avatar: true,
							},
						},
					},
				},
				readers: true,
				messageImage: true,
				chat: true,
				_count: {
					select: {
						readers: true,
					},
				},
			},
		});
		return message;
	},

	update: async (id, data) => {
		const message = await Prisma.message.update({
			where: { id },
			data,
			include: {
				sender: {
					select: {
						username: true,
						profile: {
							select: {
								avatar: true,
							},
						},
					},
				},
				readers: true,
				messageImage: true,
				chat: true,
				_count: {
					select: {
						readers: true,
					},
				},
			},
		});
		return message;
	},

	getByChat: async (chatId, skip = 0, take = 20) => {
		console.log(chatId, skip, take, "getByChat");
		const messages = await Prisma.message.findMany({
			where: {
				chatId,
			},
			orderBy: { created_at: "desc" },
			skip: 0,
			take: 40,
			include: {
				sender: {
					select: {
						username: true,
						profile: {
							select: {
								avatar: true,
							},
						},
					},
				},

				messageImage: true,
				_count: {
					select: {
						readers: true,
					},
				},
				readers: true,
			},
		});
		return messages;
	},

	addReader: async (messageIds, userId) => {
		try {
			const messages = await Prisma.messageReaders.createMany({
				data: messageIds.map((id) => ({
					messageId: id,
					userId: userId,
				})),
			});
		} catch (error) {}

		// return message;
	},
	async getUnreadMessages(chatId, userId) {
		const message = await Prisma.message.count({
			where: {
				chatId: chatId,
				senderId: { not: userId }, // не свои сообщения

				messageReaders: {
					// связь с MessageReaders
					none: {
						// нет записи о прочтении этим пользователем
						userId: userId,
					},
				},
			},
		});
		return message;
	},
};
