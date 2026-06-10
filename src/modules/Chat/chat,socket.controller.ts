// import { AppError } from "../../errors";
import { chatService } from "./chat.service.ts";
import type { ChatSocketControllerContract } from "./chat.types.ts";

export const ChatSocketController: ChatSocketControllerContract = {
	async joinChat(socket, data, ack) {
		try {
			console.log(data.chatId, socket.data.userId, data);
			const isSocketParticipant = await chatService.isUserInChat(
				data.chatId,
				socket.data.userId,
			);
			console.log(isSocketParticipant, "qqqqqq");
			if (
				isSocketParticipant ||
				typeof isSocketParticipant !== "string"
			) {
				socket.join(`chat-${data.chatId}`);
				if (ack) {
					ack({
						status: "ok",
					});
				}
			} else {
				if (ack) {
					ack({
						status: "error",
						message: "you are not chat participant",
					});
				}
			}
		} catch (error) {
			if (!ack) return;
			ack({
				status: "error",
				message: "unknown error",
			});
		}
	},
	leaveChat(socket, data) {
		socket.leave(`chat-${data.chatId}`);
	},
	manageChats(socket) {
		socket.on("chatConnect", (data, ack) => {
			this.joinChat(
				socket,
				typeof data === "string" ? JSON.parse(data) : data,
				ack,
			);
		});
	},
};
