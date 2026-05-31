import { convertBigIntToNumber } from '../../middlewares/bigIntMiddleare.ts'
import { messageService } from './message.service.ts'
import type { MessageSocketControllerContract } from './message.types.ts'

console.log("eqeqeq")
export const MessageSocketController: MessageSocketControllerContract = {
    registerHandlers(socketServer, socket) {
        socket.on('sendMessage', (data) => {
            console.log("3213132")
            this.sendMessage(socketServer, socket, data)
        })
    },
    
    async sendMessage(socketServer, socket, rawData) {
        try {
            let data = rawData;
            console.log(data, "is instrest", data.text)
            if (typeof rawData === 'string') {
                try {
                    data = JSON.parse(rawData);
                } catch (err) {
                    console.error('Failed to parse JSON:', rawData);
                    return;
                }
            }
            const message = await messageService.create(
                data,
                socket.data.userId,
            )
            console.log(message)
            if (typeof message === "string") return console.log(message)
            this.newMessage(socketServer, message)
        } catch (error) {
            console.log(error)
        }
    },
    
    async newMessage(socketServer, message) {
        try {
            const serializedMessage = convertBigIntToNumber(message)
            console.log(serializedMessage.id, "sseesndsnesneds",`chat-${Number(message.chatId)}`)
            socketServer.to(
                `chat-${Number(message.chatId)}`
            ).emit(
                'newMessage',
                serializedMessage
            )
        } catch (error) {
            console.log(error)
        }
    }
}