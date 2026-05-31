import Prisma from "../../config/prisma.ts";
import type{ Response, Request, NextFunction } from "express";
import type { AuthenticatedSocket } from "../Socket/socket.types.ts";
export type IChatCreate = Prisma.ChatCreateInput
export type IChatUpdate = Prisma.ChatUpdateInput
export type IChat = Prisma.ChatGetPayload<{}>

export interface IChatCreateInput {
    users: number[];
    Isgroup?: boolean
    avatar?: string
    name?: string
}

export type IChatRepository = {
    create: (data: IChatCreate) => Promise<IChat>
    update: (data: IChatUpdate, chatId: bigint) => Promise<IChat>
    getByUserId: (userId: bigint) => Promise<IChat[]>
    isUserInChat: (chatId: bigint, userId: bigint) => Promise<boolean>
}


export type IChatService = {
    createChat: (data: IChatCreateInput) => Promise<IChat | string>
    updateChat: (data: IChatUpdate, chatId: number) => Promise<IChat | string>
    getByUserId: (userId: number) => Promise<IChat[] | string>
    isUserInChat: (chatId: number, userId: number) => Promise<boolean | string>
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