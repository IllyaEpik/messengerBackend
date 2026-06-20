import type { Request, Response, NextFunction } from "express";
import type {
	UserCreate,
	UserLogin,
	UserSecurity,
	UserSecurityWithId,
	IProfile,
	ProfileCreate,
	IToken,
	IError,
	IUser,
	gottenFriends,
	friendInfoOutput,
	userInfo,
	pagination,
	ProfileUpdateInput,
	UserUpdate,
	ProfileUpdate,
	updateProfileFile,
	UserCallback,
	UserPayload,
	IEmailVerification,
} from "./user.types.ts";
import type {
	AuthenticatedSocket,
	ServerSocket,
} from "../../Socket/socket.types.ts";
export interface IRepositoryContract {
	createUser: (user: UserCreate) => Promise<UserSecurityWithId | null>;
	getUser: (email: string) => Promise<IUser | null>;
	getUserById: (id: bigint) => Promise<UserSecurityWithId | null>;
	createCode: (
		userId: bigint,
		code: number,
		expiresAt: Date,
	) => Promise<void>;
	getCode: (code: number) => Promise<IEmailVerification | null>;
	deleteCode: (id: bigint | number) => Promise<void>;
	//confirmUserById: (userId:number) => Promise<void>
	updateUser: (id: bigint, data: UserUpdate) => Promise<IUser | null>;
	updateProfile: (
		userId: bigint,
		data: ProfileUpdate,
	) => Promise<IProfile | null>;
	createProfile: (
		id: bigint,
		data: ProfileCreate,
	) => Promise<IProfile | null>;
	sendFriendRequest: (fromUserId: bigint, toUserId: bigint) => Promise<void>;
	confirmFriendRequest: (
		fromUserId: bigint,
		toUserId: bigint,
	) => Promise<void>;
	getFriends: (userId: bigint, pagination: pagination) => Promise<IProfile[]>;
	getFriendRequests: (userId: bigint) => Promise<IProfile[]>;
	getRecommendedFriends: (
		userId: bigint,
		exceptions: bigint[],
	) => Promise<IProfile[]>;
	deleteFriend: (userId: bigint, friendId: bigint) => Promise<void>;
	removeRecommendations: (userId: bigint, friendId: bigint) => Promise<void>;
	getfriendById: (userId: bigint) => Promise<userInfo | null>;
	getAllUsers: () => Promise<IUser[]>;
	deleteUser: (id: number) => void;
}

export interface IServiceContract {
	registation: (user: UserCreate) => Promise<string>;
	login: (userData: UserLogin) => Promise<string | IToken>;
	me: (id: number) => Promise<UserSecurity | string>;
	secondPhaseOfRegistation: (code: number) => Promise<string | IToken>;
	updateUser: (
		id: number,
		data: ProfileUpdateInput,
		files?: updateProfileFile,
	) => Promise<IProfile | string>;
	createProfile: (
		id: number,
		data: ProfileCreate,
	) => Promise<IProfile | string>;
	sendFriendRequest: (
		fromUserId: number,
		toUserId: number,
	) => Promise<void | string>;
	confirmFriendRequest: (
		fromUserId: number,
		toUserId: number,
	) => Promise<void>;
	getFriends: (
		userId: number,
		pagination: pagination,
	) => Promise<gottenFriends | string>;
	deleteFriend: (userId: number, friendId: number) => Promise<void>;
	removeRecommendations: (userId: number, friendId: number) => Promise<void>;
	getfriendById: (userId: number) => Promise<friendInfoOutput>;
	getAllUsers: () => Promise<IUser[]>;
	updateLastSeenAt: (id: number) => Promise<IUser | null>;
	deleteUser: (id: number) => void;
}

export interface IControllerContract {
	registation: (
		req: Request<{}, IError | string, UserCreate>,
		res: Response<IError | string>,
		next: NextFunction,
	) => Promise<void>;
	RegistrationSecondPhase: (
		req: Request<{ code: number }, IToken | IError | string, {}>,
		res: Response<IToken | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	login: (
		req: Request<{}, IToken | IError | string, UserLogin>,
		res: Response<IToken | IError | string>,
		next: NextFunction,
	) => Promise<void>;

	me: (
		req: Request<{}, UserSecurity | IError | string, {}>,
		res: Response<UserSecurity | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	updateUser: (
		req: Request<{}, IProfile | IError | string, ProfileUpdateInput>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	createProfile: (
		req: Request<{}, IProfile | IError | string, ProfileCreate>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;

	sendFriendRequest: (
		req: Request<
			{
				profile: string;
			},
			IProfile | IError | string,
			ProfileCreate
		>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	confirmFriendRequest: (
		req: Request<
			{
				fromUserId: string;
			},
			IProfile | IError | string,
			ProfileCreate
		>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	getFriends: (
		req: Request<{}, IProfile[] | IError | string, {}, pagination>,
		res: Response<IProfile[] | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	deleteFriend: (
		req: Request<{ friendId: string }, IProfile | IError | string, {}>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	removeRecommendations: (
		req: Request<{ friendId: string }, IProfile | IError | string, {}>,
		res: Response<IProfile | IError | string>,
		next: NextFunction,
	) => Promise<void>;
	getfriendById: (
		req: Request<{ userId: string }, friendInfoOutput, {}>,
		res: Response<friendInfoOutput, { data: friendInfoOutput }>,
		next: NextFunction,
	) => Promise<void>;
	getAllUsers: (
		req: Request<object, IUser, {}>,
		res: Response<IUser, { data: IUser[] }>,
		next: NextFunction,
	) => Promise<void>;
	deleteUser: (
		req: Request<object, object, {}>,
		res: Response<void, { userId: number | string; data: string }>,
		next: NextFunction,
	) => Promise<void>;
}
export interface UserSocketControllerContract {
	subscriptions: Map<number, Set<number>>;
	registerHandlers: (
		socket: AuthenticatedSocket,
		socketServer: ServerSocket,
	) => void;
	isUserOnline: (userId: number, socketServer: ServerSocket) => boolean;
	getUsersOnline: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: UserPayload,
		ack?: UserCallback,
	) => void;
	notifySubscribers: (
		socket: AuthenticatedSocket,
		socketServer: ServerSocket,
		status: "online" | "offline",
	) => void;
}

export interface UserEvents {
	getUsersOnline: (data: UserPayload, ack?: UserCallback) => void;
}
