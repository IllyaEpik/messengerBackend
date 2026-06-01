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
			const chats = (await chatRepository.getByUserId(BigInt(userId))).map((chat) => {
				const chatName = chat.is_group ? chat.name || "without name" : chat.participants.find((participant) => participant.user.id !== BigInt(userId))?.user.username || "idk"
				return {
					id: Number(chat.id),
					chatName,
					isGroup: chat.is_group,
					avatar: chat.avatar || "avatar.png",
					message: chat.messages[0]?.text || "",
					time: chat.messages[0]?.created_at || new Date(),
				}
			})
			
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
	},
	async getChatByContact(userId, friendId) {
		try {
			let chat = await chatRepository.getChatByUsers(BigInt(userId), BigInt(friendId));
			
			if (!chat) {
				let createdChat = await this.createChat({
					users:[Number(userId), Number(friendId)]
				});
				if (typeof createdChat === "string"){
					
					return createdChat
				}
				// return createdChat
				// return 
				if (!chat) return "chat is not found|404"
			}

			const username = chat.participants.find((participant) => participant.user.id !== BigInt(userId))?.user.username
			if (!username) return "server error|500"
			return {
				id: Number(chat.id),
				chatName: username,
				avatar: chat.avatar || "avatar.png",
				isGroup: chat.is_group,
				time: chat.messages[0]?.created_at || new Date(),
				message: chat.messages[0]?.text || ""
			}
		} catch (error) {
			return `${error}|21312313`;
		}
	},
	async getChat(userId, chatId) {
		const chat = await chatRepository.getUserByChatId(BigInt(userId), BigInt(chatId))
		if (!chat) return "chat is not found|404" 
		const chatName = chat.is_group ? chat.name : chat.participants.find((participant) => participant.user.id !== BigInt(userId))?.user.username
		if (!chatName) return "server error|500"
		return {
			id: Number(chat.id),
			chatName: chatName,
			avatar: chat.avatar || "avatar.png",
			isGroup: chat.is_group,
			time: chat.messages[0]?.created_at || new Date(),
			message: chat.messages[0]?.text || ""
		}

	},
};