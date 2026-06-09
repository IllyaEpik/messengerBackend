import type { Prisma } from "../../generated/prisma/client.ts";
import type { Response, Request, NextFunction } from "express";
import { AuthenticatedSocket, ServerSocket } from "../Socket/socket.types.ts";

export type IMessageCreate = Prisma.MessageCreateInput;
export type IMessageUpdate = Prisma.MessageUpdateInput;
export type IMessage = Prisma.MessageGetPayload<{
	include: {
		sender: true;
		messageImage: true;
		_count: {
			select: {
				readers: true;
			};
		};
		readers: true;
	};
}>;

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
	addReader: (messageId: bigint, userId: bigint) => Promise<IMessage>;
};

export type IMessageService = {
	create: (
		data: IMessageCreateInput,
		senderId: number,
	) => Promise<IMessage | string>;
	update: (
		messageId: number,
		text: string,
		senderId: number,
	) => Promise<IMessage | string>;
	getByChat: (
		chatId: number,
		skip?: number,
		take?: number,
	) => Promise<IMessage[] | string>;
	addReader: (messageId: number, userId: number) => Promise<IMessage | string>;
};

export type IMessageController = {
	update: (
		req: Request<{ messageId: string }, any, { text: string }>,
		res: Response<IMessage>,
		next: NextFunction,
	) => void;
	getByChat: (
		req: Request<{ chatId: string }, any, any>,
		res: Response<IMessage[]>,
		next: NextFunction,
	) => void;
	sendImage: (
		req: Request<{ chatId: string }, any, IMessageCreateImageInput>,
		res: Response<IMessage>,
		next: NextFunction,
	) => void;
};

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
	newMessage: (socketServer: ServerSocket, message: IMessage) => void;
}
