import Prisma from "../../config/prisma.ts";
import type{ Response, Request, NextFunction } from "express";
import type { AuthenticatedSocket } from "../Socket/socket.types.ts";
export type IChatCreate = Prisma.ChatCreateInput
export type IChatUpdate = Prisma.ChatUpdateInput
export type IChat = Prisma.ChatGetPayload<{
    include: {
        participants: {
            select: {
                user: true
            }
        }
    }
}>

export type IChatContact = Prisma.ChatGetPayload<{
    select: {
        id:true,
        is_group: true,
        name: true,
        avatar: true,
        participants: {
            select: {
                user: {
                    select: {
                        username: true,
                        id:true,
                        
                    }
                }
            }
        },
        messages: {
            orderBy: {
                created_at: "desc"
            },
            take: 1,
            select: {
                text: true,
                created_at: true
            }
        }
    }
}>

export interface IChatCreateInput {
    users: number[];
    Isgroup?: boolean
    avatar?: string
    name?: string
}
export interface IChatContactOutput {
    id: number
    chatName: string
    avatar: string 
    isGroup: boolean
    time: Date | string
    message: string
}
// export interface IChatContactInput {

// }

export type IChatRepository = {
    create: (data: IChatCreate) => Promise<IChatContact>
    update: (data: IChatUpdate, chatId: bigint) => Promise<IChat>
    getByUserId: (userId: bigint) => Promise<IChatContact[]>
    isUserInChat: (chatId: bigint, userId: bigint) => Promise<boolean>
    getChatByUsers: (userId: bigint, friendId: bigint) => Promise<IChatContact | null>
    getUserByChatId: (userId:bigint, chatId: bigint) => Promise<IChatContact | null>
}


export type IChatService = {
    createChat: (data: IChatCreateInput) => Promise<IChatContact | string>
    updateChat: (data: IChatUpdate, chatId: number) => Promise<IChat | string>
    getByUserId: (userId: number) => Promise<IChatContactOutput[] | string>
    isUserInChat: (chatId: number, userId: number) => Promise<boolean | string>
    getChatByContact: (userId: number, friendId: number) => Promise<IChatContactOutput | string>
    getChat: (userId: number, chatId: number) => Promise<IChatContactOutput | string>
}

export type IChatController = {
    create: (
        req: Request<any, any, IChatCreateInput>, 
        res: Response<IChat>,
        next: NextFunction
    ) => void,
    update: (
        req: Request<{chatId: string}, any, IChatUpdate>, 
        res: Response<IChat>,
        next: NextFunction
    ) => void,
    getByUserId: (
        req: Request<any, any, any, {userid: string}>, 
        res: Response<IChat[]>,
        next: NextFunction
    ) => void,
    getChatByContact: (
        req: Request<{friendId: string}, any, any>, 
        res: Response<IChatContactOutput>,
        next: NextFunction
    ) => void
    getChat: (
        req: Request<{chatId: string}, any, any>, 
        res: Response<IChatContactOutput>,
        next: NextFunction
    ) => void
    // getChatByContact: (userId: bigint, friendId: bigint) => Promise<IChatContactOutput>
    // isUserInChat: (
    //     req: Request<any, any, any, {chatId: number, userId: number}>, 
    //     res: Response<{isInChat: boolean}>,
    //     next: NextFunction
    // ) => void
}

export interface JoinChatPayload {
    chatId: number
}

export interface LeaveChatPayload {
    chatId: number
}

export type JoinChatCallback = (
    response: { status: "ok" } | { status: "error"; message?: string}
) => void
export interface ChatSocketControllerContract {
    joinChat: (
        socket: AuthenticatedSocket,
        data: JoinChatPayload,
        ack?: JoinChatCallback,
    ) => void;
    leaveChat: (
        socket: AuthenticatedSocket, 
        data: LeaveChatPayload
    ) => void;
    manageChats: (
        socket: AuthenticatedSocket
    ) => void
}