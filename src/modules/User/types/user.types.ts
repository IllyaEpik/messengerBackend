import type { Response, Request, NextFunction } from "express";
import Prisma from "../../../config/prisma.ts";

export interface UserCreate {
	email: string;
	password: string;
}
export interface IError {
	error: unknown;
}
export interface IToken {
	token: string;
}
export interface UserLogin {
	email: string;
	password: string;
}

export type IEmailVerification = Prisma.EmailVerificationGetPayload<{
	select: {
		id: true;
		userId: true;
	};
}>;

export type IUser = Prisma.UserGetPayload<{include:{profile: true}}>;
export type UserSecurity = Omit<IUser, "password">;

export type UserSecurityWithId = Omit<UserSecurity, "id"> & { id: bigint };
export type IProfile = Prisma.ProfileGetPayload<{
	// include: {
	//     user: {
	// 		select: {
	// 			username:true,
	// 		}
	// 	}
	// }
}>;
export interface friendInfoOutput {
	readers: number;
	frieds: number;
	posts: number;
	username: string;
	pseudonym: string;
	avatar: string;
	albums: {
		photos: string[];
		theme: string;
		name: string;
		year: number;
	}[];
}
export type userInfo = Prisma.UserGetPayload<{
	include: {
		profile: {
			include: {
				albums: {
					include: {
						albumImage: true;
					};
				};
			};
		};
		posts: {
			select: {
				_count: {
					select: { views: true; likes: true; hearts: true };
				};
			};
		};
		_count: {
			select: {
				sentRequests: {
					where: { status: "accepted" };
				};
				receivedRequests: {
					where: { status: "accepted" };
				};
				posts: true;
			};
		};
	};
}>;
export type ProfileUpdateInput = {
	username?: string;
	pseudonym?: string;
	firstName?: string;
	lastName?: string;
	birthDate?: Date;
	email?: string;
	isTextSignature?: string;
	isImageSignature?: string;
};
// export type UserUpdate = {
// 	username?: string;
// 	first_name?: string;
// 	last_name?: string;
// 	email?: string;
// };
export type UserUpdate = Prisma.UserUpdateInput;
export type ProfileUpdate = {
	pseudonym?: string;
	birth_date?: Date;
	is_text_signature?: boolean;
	is_image_signature?: boolean;
	avatar?: string;
	signature?: string;
};
// export type ProfileUpdate = {
// 	username?: string;
// 	presudonym?: string;
// }
export type ProfileCreate = {
	pseudonym: string;
	username: string;
};

export interface gottenFriends {
	friends: IProfile[];
	friendRequests: IProfile[];
	friendsRecommneds: IProfile[];
}

export type updateProfileFileInput = {
	avatar?: Express.Multer.File[];
	signature?: Express.Multer.File[];
};
export type updateProfileFile = {
	avatar?: string | undefined;
	signature?: string | undefined;
};
export interface pagination {
	recommends?: number;
	requests?: number;
}
export type UserCallback = (
	response:
		| {
				onlineUserIds: {
					status: string;
					id: number;
				}[];
		  }
		| {
				status: "error";
				message?: string;
		  },
) => void;
export interface UserPayload {
	userIds: number[];
}
export type UserStatus = {
	id: number;
	status: "online" | "offline";
};
