import type { Response, Request, NextFunction } from "express";
import Prisma from "../../config/prisma.ts";

export type IPost = Prisma.PostGetPayload<{
	// include: {
	// 	tags: {
	// 		select: {
	// 			tag: {
	// 				select: {
	// 					name: true
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	include: {
		images: {
			select:{
				compressed_image: true,
				original_image: true
			}
		},
	likes: {
			where: {
				userId: number
			},
			select: {
				id: true
			}
		},
		hearts: {
			where: {
				userId: number
			},
			select: {
				id: true
			}
		}
	}

}>;
export type IPostOutput = {
	isLiked: boolean
	isHearted: boolean
} & IPost
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

export type actionPostInput = {
	like?: "false" | "true";
	love?: "false" | "true";
};
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
		res: Response<IPost[], {userId: number, data: IPost[]}>,
		next: NextFunction,
	) => Promise<void>;
	update: (
		req: Request<{ id: string }, IPost[], updatePost, any>,
		res: Response<IPost, { userId: number, data: IPost }>,
		next: NextFunction,
	) => Promise<void>;
	action: (
		req: Request<{ id: string }, IPost, any, actionPostInput>,
		res: Response<IPost, { userId: number, data: IPost }>,
		next: NextFunction,
	) => Promise<void>;
	delete: (
		req: Request<{ id: string }, { status: string }, any, any>,
		res: Response<{ status: string }, { userId: number }>,
		next: NextFunction,
	) => Promise<void>;
}

export interface IServiceContract {
	create: (
		data: createPost,
		userId: number,
		images: string[],
	) => Promise<IPost>;
	getByUser: (userId: number) => Promise<IPostOutput[]>;
	get: (userId: number, skip: number) => Promise<IPostOutput[]>;
	update: (
		id: number,
		userId: number,
		data: updatePost,
		images: string[],
	) => Promise<IPost>;
	action: (id: number, userId: number, action: actionPost) => Promise<IPost>;
	delete: (id: number, userId: number) => Promise<void>;
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
	delete: (id: bigint, userId: bigint) => Promise<void>;
}
