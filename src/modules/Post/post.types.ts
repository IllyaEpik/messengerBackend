import type { Response, Request, NextFunction } from "express";
import Prisma from "../../config/prisma.ts";

export type IPost = Prisma.PostGetPayload<{}>;
type createPost = {
	title: string;
	content: string;
	links?: string[];
	tags?: string[];
	topic?: string;
};
interface givenPosts {
	title: string;
	content: string;
	links: string;
	tags: string;
	topic?: string;
}

export type actionPost = {
	like?: boolean;
	love?: boolean;
};
export type updatePost = Partial<createPost>;

export type files =
	| Express.Multer.File[]
	| {
			[fieldname: string]: Express.Multer.File[];
	  }
	| undefined;

export interface IControllerContract {
	create: (
		req: Request<any, IPost, givenPosts, any>,
		res: Response<IPost, { userId: number }>,
		next: NextFunction,
	) => Promise<void>;
	getByUser: (
		req: Request<any, IPost[], any, any>,
		res: Response<IPost[]>,
		next: NextFunction,
	) => Promise<void>;
	get: (
		req: Request<any, IPost[], any, { skip?: number; userId?: number }>,
		res: Response<IPost[]>,
		next: NextFunction,
	) => Promise<void>;
	update: (
		req: Request<{ id: string }, IPost[], updatePost, any>,
		res: Response<IPost, { userId: number }>,
		next: NextFunction,
	) => Promise<void>;
	action: (
		req: Request<{ id: string }, IPost, any, actionPost>,
		res: Response<IPost, { userId: number }>,
		next: NextFunction,
	) => Promise<void>;
	delete: (
		req: Request<{ id: string }, IPost, any, any>,
		res: Response<IPost, { userId: number }>,
		next: NextFunction,
	) => Promise<void>;
}

export interface IServiceContract {
	create: (
		data: createPost,
		userId: number,
		images: string[],
	) => Promise<IPost>;
	getByUser: (userId: number) => Promise<IPost[]>;
	get: (userId: number, skip: number) => Promise<IPost[]>;
	update: (
		id: number,
		userId: number,
		data: updatePost,
		images: string[],
	) => Promise<IPost>;
	action: (id: number, userId: number, action: actionPost) => Promise<IPost>;
	delete: (id: number, userId: number) => Promise<IPost>;
}

export interface IRepositoryContract {
	create: (
		data: createPost,
		userId: bigint,
		images: string[],
	) => Promise<IPost>;
	getByUser: (userId: bigint) => Promise<IPost[]>;
	get: (userId: bigint, skip: number) => Promise<IPost[]>;
	update: (
		id: bigint,
		userId: bigint,
		data: updatePost,
		images: string[],
	) => Promise<IPost>;
	action: (id: bigint, userId: bigint, action: actionPost) => Promise<IPost>;
	delete: (id: bigint, userId: bigint) => Promise<IPost>;
}
