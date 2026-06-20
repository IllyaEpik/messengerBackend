import type { Prisma } from "../../generated/prisma/client.ts";
import type { Response, Request, NextFunction } from "express";
import { AuthenticatedSocket, ServerSocket } from "../Socket/socket.types.ts";

export type IMessageCreate = Prisma.MessageCreateInput;
export type IMessageUpdate = Prisma.MessageUpdateInput;
export type IMessage = Prisma.MessageGetPayload<{
	include: {
		sender: {
			select: {
				username: true;
				profile: {
					select: {
						avatar: true;
					};
				};
			};
		};
		messageImage: true;
		_count: {
			select: {
				readers: true;
			};
		};
		readers: true;
	};
}>;
export interface IMessageOutput {
	id: number;
	text: string;
	readers: number;
	senderId: number;
	images: string[];
	senderName: string;
	senderAvatar: string;
	date: string;
	chatId: number;
}
export interface IMessageCreateInput {
	text: string;
	chatId: number;
	images?: string[];
}
export interface IMessageCreateImageInput {
	text: string;
	images: string[];
}

export type IMessageRepository = {
	create: (data: IMessageCreate) => Promise<IMessage>;
	update: (id: bigint, data: IMessageUpdate) => Promise<IMessage>;
	getByChat: (
		chatId: bigint,
		skip?: number,
		take?: number,
	) => Promise<IMessage[]>;
	addReader: (
		messageIds: bigint[] | number[],
		userId: bigint | number,
	) => Promise<void>;
	getUnreadMessages: (chatId: bigint, userId: bigint) => Promise<number>;
};

export type IMessageService = {
	create: (
		data: IMessageCreateInput,
		senderId: number,
	) => Promise<IMessageOutput | string>;
	update: (
		messageId: number,
		text: string,
		senderId: number,
	) => Promise<IMessageOutput | string>;
	getByChat: (
		chatId: number,
		userId: number,
		skip?: number,
		take?: number,
	) => Promise<IMessageOutput[] | string>;
	addReader: (messageId: number, userId: number) => void;
};

export type IMessageController = {
	update: (
		req: Request<{ messageId: string }, any, { text: string }>,
		res: Response<IMessageOutput>,
		next: NextFunction,
	) => void;
	getByChat: (
		req: Request<{ chatId: string }, any, any>,
		res: Response<IMessageOutput[]>,
		next: NextFunction,
	) => void;
	sendImage: (
		req: Request<{ chatId: string }, any, IMessageCreateImageInput>,
		res: Response<IMessageOutput>,
		next: NextFunction,
	) => void;
};
export interface IMessageRead {
	messageId: number;
	chatId: number;
}
export interface MessageSocketControllerContract {
	registerHandlers: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
	) => void;
	sendMessage: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: IMessageCreateInput,
	) => void;
	newMessage: (
		socketServer: ServerSocket,
		userId: number,
		message: IMessageOutput,
	) => void;
	readMessage: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: IMessageRead,
		ack: () => void,
	) => void;
	updateChat: (
		socketServer: ServerSocket,
		userId: number,
		message: IMessageOutput,
	) => void;
}
