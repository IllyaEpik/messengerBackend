import type { IMessageService, IMessageCreate } from "./message.types.ts";
import { messageRepository } from "./message.repository.ts";
import Prisma from "../../config/prismaClient.ts";

export const messageService: IMessageService = {
	create: async (data, senderId) => {
		try {
			// console.log('typeof data:', typeof data);
			// console.log('data constructor:', data.constructor.name);
			// console.log('data keys:', Object.keys(data));
			// console.log('data values:', Object.values(data));
			console.log(
				data,
				data.text,
				"dsaasdasdasdsadsadasdsadsdsadasdasdasdasdasd",
			);
			const createData: IMessageCreate = {
				text: data.text,
				chat: { connect: { id: data.chatId } },
				sender: { connect: { id: senderId } },
				...(data.images &&
					data.images.length > 0 && {
						messageImage: {
							create: data.images.map((img) => ({ image: img })),
						},
					}),
			};
			console.log(createData);
			const message = await messageRepository.create(createData);
			return message;
		} catch (error) {
			return `${error}`;
		}
	},

	update: async (messageId, text, senderId) => {
		try {
			const existing = await Prisma.message.findUnique({
				where: { id: messageId },
			});
			if (!existing || Number(existing.senderId) !== senderId) {
				return "not found|404";
			}

			const message = await messageRepository.update(BigInt(messageId), {
				text,
			});
			return message;
		} catch (error) {
			return "not found|404";
		}
	},

	getByChat: async (chatId, skip = 0, take = 20) => {
		try {
			const messages = await messageRepository.getByChat(
				BigInt(chatId),
				skip,
				take,
			);
			return messages;
		} catch (error) {
			return "not found|404";
		}
	},

	addReader: async (messageId, userId) => {
		try {
			const message = await messageRepository.addReader(
				BigInt(messageId),
				BigInt(userId),
			);
			return message;
		} catch (error) {
			return "not found|404";
		}
	},
};
