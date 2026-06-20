import { convertBigIntToNumber } from "../../middlewares/bigIntMiddleare.ts";
import { chatRepository } from "../Chat/chat.repository.ts";
import { messageRepository } from "./message.repository.ts";
import { messageService } from "./message.service.ts";
import type { MessageSocketControllerContract } from "./message.types.ts";

export const MessageSocketController: MessageSocketControllerContract = {
	registerHandlers(socketServer, socket) {
		socket.on("sendMessage", (data) => {
			console.log("3213132");
			this.sendMessage(socketServer, socket, data);
		});
		socket.on("readMessage", (data, ack) => {
			this.readMessage(socketServer, socket, data, ack);
		});
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
			if (typeof message === "string") return console.log(message);
			this.newMessage(socketServer, socket.data.userId, message);
		} catch (error) {
			console.log(error);
		}
	},

	async newMessage(socketServer, userId, message) {
		try {
			console.log(message);
			const serializedMessage = convertBigIntToNumber(message);
			socketServer
				.to(`chat-${message.chatId}`)
				.emit("newMessage", serializedMessage);
			this.updateChat(socketServer, userId, message);
		} catch (error) {
			console.log(error);
		}
	},
	async readMessage(socketServer, socket, data, ack) {
		try {
			messageRepository.addReader([data.messageId], socket.data.userId);
			socketServer
				.to(`user_${socket.data.userId}`)
				.emit("messageRead", {});
		} catch (error) {
			console.log(error);
		}
	},
	async updateChat(socketServer, userId, message) {
		const chat = await chatRepository.getUserByChatId(
			userId,
			message.chatId,
		);

		chat?.participants.forEach((participant) => {
			socketServer
				.to(`user_${Number(participant.user.id)}`)
				.emit("updateChat", {
					message,
				});
		});
	},
};
