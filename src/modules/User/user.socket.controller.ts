import type{ UserSocketControllerContract } from "./types/user.contract.ts";
import type { UserStatus } from "./types/user.types.ts";
import { UserService } from "./user.service.ts";

export const UserSocketController: UserSocketControllerContract = {
    subscriptions:  new Map(),
    registerHandlers(socket, socketServer) {
        console.log(socket.data.userId, 22222222222222222222222222222222)
        socket.join(`user_${socket.data.userId}`)
        this.notifySubscribers(socket, socketServer, "online")
        UserService.updateLastSeenAt(socket.data.userId)
        socket.on("getUsersOnline", (data, ack) => {
            this.getUsersOnline(socketServer, socket, data, ack)
        })
        socket.on('disconnect', () => {
            this.notifySubscribers(socket, socketServer, "offline") 
            UserService.updateLastSeenAt(socket.data.userId)
        })
    },

    async getUsersOnline(socketServer, socket, data, ack) {
        const userStatuses: UserStatus[] = []
        console.log(data, 22222222222222222222222222222222)
        data.userIds.forEach( (userId) => {
            if (this.isUserOnline(userId, socketServer)){
                userStatuses.push({
                    id: userId,
                    status: "online"
                })
            } else {
                userStatuses.push({
                    id: userId,
                    status: "offline"
                })
            }
            if (!this.subscriptions.has(userId)) {
                this.subscriptions.set(userId, new Set())
            } 
            this.subscriptions.get(userId)?.add(socket.data.userId)
        })
        console.log(userStatuses, 21231312)

        if (ack){
            ack({onlineUserIds: userStatuses})
        }
    }, 

     isUserOnline(userId, socketServer) {
        return socketServer.sockets.adapter.rooms.has(`user_${userId}`)
    },
    notifySubscribers(socket, socketServer, status){
        const mySubscribers = this.subscriptions.get(socket.data.userId)
        if (!mySubscribers){
            return
        }
        const subscriberRooms = Array.from(mySubscribers).map((subscriber) => {
            return `user_${subscriber}`
        })
        
        subscriberRooms?.forEach(async (subscriber) => {
            socketServer.to(subscriber).emit("statusUpdate", {
                id: socket.data.userId,
                status: status
            })
        })
    }
} 