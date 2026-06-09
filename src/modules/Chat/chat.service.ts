import type{ IChatService, IChatCreateInput, IChatCreate, IChatUpdate } from "./chat.types.ts";
import { chatRepository } from "./chat.repository.ts";
import { getLocalTimeString } from "../../utils/getLocalTimeString.ts";

export const chatService: IChatService = {
	createChat: async (data: IChatCreateInput, userId, avatar) => {
		try {
			console.log(avatar || "avatar.png")
			const createData: IChatCreate = {
				name: data.name || "idk",
				is_group:  data.Isgroup === "true",
				avatar: avatar || "avatar.png",
				
				participants: {
					create: data.users.map((id) => ({
						user: { connect: { id:Number(id) } }
					}))
				},
				...(data.Isgroup ?
					{admin: {
						connect: {
							id: userId
						}
					}} : {}
				)
			};

			const created = await chatRepository.create(createData);
			return created;
		} catch (error) {
			console.log(error)
			return `${error}`
		}
	},

	updateChat: async (data, chatId, avatar) => {
		try {
			const givenUsers = data.users.map(id => Number(id)) || []
			const existingParticipants = await chatRepository.getAllParticipants(BigInt(chatId));
    		const existingUserIds = existingParticipants.map(p => p.userId);
			const newUserIds = (givenUsers).filter(
				(userId) => !existingUserIds.includes(BigInt(userId))
			);
			const removeParticipants = existingUserIds.filter(
				(userId) => !givenUsers.includes(Number(userId))
			)
			if (removeParticipants){
				await chatRepository.deleteSelectedParticipants(removeParticipants, BigInt(chatId))
			}
			const updateData: IChatUpdate = {
				name: data.name || "no name",
				avatar: avatar || "avatar.png",
			};
			if (newUserIds.length > 0) {
				updateData.participants = {
					create: newUserIds.map((id) => ({
						user: { connect: { id } }
					}))
				}
			}
			const updated = await chatRepository.update(updateData, BigInt(chatId));
			return updated;
		} catch (error) {
			return `${error}|500`;
		}
	},

	getByUserId: async (userId) => {
		try {
			const chats = (await chatRepository.getByUserId(BigInt(userId))).map((chat) => {
				const chatName = chat.is_group ? chat.name || "without name" : chat.participants.find((participant) => participant.user.id !== BigInt(userId))?.user.username || "idk"
				const time = (chat.messages[0]?.created_at || new Date())
				//const currentTime = new Date()
				//const userTime = time.getDate() + time.getMonth()===currentTime.getDate() + time.getMonth()?
				//`${time.getHours()}:${time.getMinutes()}`	:
				//`${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`
				return {
					id: Number(chat.id),
					chatName,
					isGroup: chat.is_group,
					avatar: chat.avatar || "avatar.png",
					message: chat.messages[0]?.text || "",
					time: getLocalTimeString(time),
					// chat.messages[0]?.created_at
				}
			})
			
			return chats;
		} catch (error) {
			console.log()
			return `${error}|500`;
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
				}, userId);
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
				// time: chat.messages[0]?.created_at || new Date(),
				// message: chat.messages[0]?.text || ""
				message: "",
				time: "00:00"
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
			isAdmin: chat.adminId === BigInt(userId),
			// time: chat.messages[0]?.created_at || new Date(),
			// message: chat.messages[0]?.text || ""
			time: getLocalTimeString(chat.messages[0]?.created_at),
			message: "",
			users: chat.participants.map((participant) => ({
				id: Number(participant.user.id),
				username: participant.user.username || "no name"
			}))
		}

	},
	async deleteChat(userId, chatId) {
		const chat = await chatRepository.deleteChat(BigInt(userId), BigInt(chatId))
		if (!chat) return "chat is not found|404" 
		return {
			id: Number(chat.id),
			chatName: "chatName",
			avatar: chat.avatar || "avatar.png",
			isGroup: chat.is_group,
			// time: chat.messages[0]?.created_at || new Date(),
			// message: chat.messages[0]?.text || ""
			time: "00:00",
			message: ""
		}
	},
};