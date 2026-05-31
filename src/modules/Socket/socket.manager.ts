import { authSocketMiddleware } from "../../middlewares/socketAuth.ts";
import { ChatSocketController } from "../Chat/chat,socket.controller.ts";
import { MessageSocketController } from "../Messages/message.socket.controller.ts";
import type { AuthenticatedSocket, ServerSocket, SocketManagerContract } from "./socket.types.ts";
import { Server as SocketServer } from "socket.io";



export const SocketManager: SocketManagerContract = {
	socketServer: null,
	initSocketServer(httpServer) {
		this.socketServer = new SocketServer<ServerSocket>(httpServer, {
			cors: {
				origin: "*",
			},
		});
        
		this.socketServer.use(authSocketMiddleware)
		this.socketServer.on("connection", (socket: AuthenticatedSocket) => {
            console.log(socket.data, "dasdasasdd")
            if (!socket.data.userId || !this.socketServer) return 
			console.log("Socket was connected", socket.data.userId);
			console.log(socket.rooms)
			socket.join(`user-${socket.data.userId}`)
			console.log(socket.rooms);
            ChatSocketController.manageChats(socket);
            MessageSocketController.registerHandlers(this.socketServer,socket);
			socket.on('disconnect', () => {
				console.log("disconnected", socket.id)
			})
		});
	},
};