import { convertBigIntToNumber } from "../../middlewares/bigIntMiddleare.ts";
import { chatRepository } from "../Chat/chat.repository.ts";
import { messageRepository } from "./message.repository.ts";
import { messageService } from "./message.service.ts";
import type { MessageSocketControllerContract } from "./message.types.ts";

console.log("eqeqeq");
export const MessageSocketController: MessageSocketControllerContract = {
	registerHandlers(socketServer, socket) {
		socket.on("sendMessage", (data) => {
			console.log("3213132");
			this.sendMessage(socketServer, socket, data);
			
		});
		socket.on("readMessage", (data, ack) => {
			this.readMessage(socket,data, ack)
		})
	},

	async sendMessage(socketServer, socket, rawData) {
		try {
			let data = rawData;

			console.log(data, "is instrest", data.text);
			if (typeof rawData === "string") {
				try {
					data = JSON.parse(rawData);
				} catch (err) {
					console.error("Failed to parse JSON:", rawData);
					return;
				}
			}
			const message = await messageService.create(
				data,
				socket.data.userId,
			);
			console.log(message);
			if (typeof message === "string") return console.log(message);
			this.newMessage(socketServer, socket, message);
		} catch (error) {
			console.log(error);
		}
	},

	async newMessage(socketServer, socket, message) {
		try {
			const serializedMessage = convertBigIntToNumber(message);
			console.log(
				serializedMessage.id,
				"sseesndsnesneds",
				`chat-${message.chatId}`,
			);
			socketServer
				.to(`chat-${message.chatId}`)
				.emit("newMessage", serializedMessage);
			this.updateChat(socketServer, socket, serializedMessage)
		} catch (error) {
			console.log(error);
		}
	},
	async readMessage(socket, data, ack) {
		try {
			messageRepository.addReader([ data.messageId], socket.data.userId)
			// socketServer
			// 	.to(`chat-${message.chatId}`)
			// 	.emit("newMessage", serializedMessage);
		} catch (error) {
			console.log(error);
		}
	},
	async updateChat(socketServer, socket, message) {
		const chats = await chatRepository.getUserByChatId(socket.data.userId,message.chatId)
		chats?.participants.forEach(participant => {
			if (Number(participant.user.id) === socket.data.userId) return
			socketServer.to(`user-${participant.user.id}`).emit("updateChat",{
				message
			})
		})
	},
};
