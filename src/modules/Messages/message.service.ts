import type { IMessageService, IMessageCreate } from "./message.types.ts";
import { messageRepository } from "./message.repository.ts";
import Prisma from "../../config/prismaClient.ts";
import { chatRepository } from "../Chat/chat.repository.ts";
import { getLocalTimeString } from "../../utils/getLocalTimeString.ts";

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
				created_at: new Date(),
				chat: { connect: { id: data.chatId } },
				sender: { connect: { id: senderId } },
				...(data.images &&
					data.images.length > 0 && {
						messageImage: {
							create: data.images.map((img) => ({ image: img })),
						},
					}),
			};

			const message = await messageRepository.create(createData);
			const messageOutput = {
				id: Number(message.id),
				text: message.text || "",
				readers: message._count.readers,
				images: message.messageImage.map((image) => image.image),
				senderName: message.sender?.username || "no name",
				senderAvatar: message.sender?.profile?.avatar || "avatar.png",
				date: getLocalTimeString(message.created_at),
				chatId: Number(message.chatId),
				senderId: Number(message.senderId),
			};
			return messageOutput;
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
			const messageOutput = {
				id: Number(message.id),
				text: message.text || "",
				readers: message._count.readers,
				images: message.messageImage.map((image) => image.image),
				senderName: message.sender?.username || "no name",
				senderAvatar: message.sender?.profile?.avatar || "avatar.png",
				date: getLocalTimeString(message.created_at),
				chatId: Number(message.chatId),
				senderId: Number(message.senderId),
			};
			return messageOutput;
		} catch (error) {
			return "not found|404";
		}
	},

	getByChat: async (chatId, userId, skip = 0, take = 20) => {
		try {
			const isInChat = await chatRepository.isUserInChat(
				BigInt(chatId),
				BigInt(userId),
			);
			if (!isInChat) return "auth error|401";
			const messages = await messageRepository.getByChat(
				BigInt(chatId),
				skip,
				take,
			);
			await messageRepository.addReader(messages
				.filter(message => 
				Number(message.senderId) !== userId && 
				!message.readers.some(message => Number(message.userId) === userId))
				.map(message => message.id),
				userId) 
			const messagesOutput = messages.map((message) => ({
				id: Number(message.id),
				text: message.text || "",
				readers: message._count.readers,
				images: message.messageImage.map((image) => image.image),
				senderName: message.sender?.username || "no name",
				senderAvatar: message.sender?.profile?.avatar || "avatar.png",
				date: getLocalTimeString(message.created_at),
				chatId: Number(message.chatId),
				senderId: Number(message.senderId),
			}));
			return messagesOutput;
		} catch (error) {
			console.log(error)
			return "wtf|500";
		}
	},
	async addReader (messageId, userId) {
		await messageRepository.addReader([messageId], userId)
	}
};
