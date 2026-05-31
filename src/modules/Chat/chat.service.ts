import type{ IChatService, IChatCreateInput, IChatCreate } from "./chat.types.ts";
import { chatRepository } from "./chat.repository.ts";

export const chatService: IChatService = {
	createChat: async (data: IChatCreateInput) => {
		try {
			const createData: any = {
				name: data.name || "idk",
				is_group: data.Isgroup ?? false,
				avatar: data.avatar || "avatar.png",
				participants: {
					create: data.users.map((id) => ({
						user: { connect: { id } }
					}))
				}
			};

			const created = await chatRepository.create(createData);
			return created;
		} catch (error) {
			console.log(error)
			return `${error}`
		}
	},

	updateChat: async (data, chatId) => {
		try {

			const updated = await chatRepository.update(data, BigInt(chatId));
			return updated;
		} catch (error) {
			return "not found|404";
		}
	},

	getByUserId: async (userId) => {
		try {
			const chats = await chatRepository.getByUserId(BigInt(userId));
			return chats;
		} catch (error) {
			return `${error}|21312313`;
		}
	},

	isUserInChat: async (chatId, userId) => {
		try {
			const isIn = await chatRepository.isUserInChat(BigInt(chatId), BigInt(userId));
			return isIn;
		} catch (error) {
			return `${error}|21312313`;
		}
	}
};