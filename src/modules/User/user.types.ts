import type{ Response, Request, NextFunction } from "express";
import Prisma from "../../config/prisma.ts";

export type UserCreate = Prisma.UserCreateInput
export type ProfileCreate = Omit<Prisma.ProfileCreateInput, "user">
export type ProfileUpdate = Prisma.ProfileUpdateInput
export type avatarCreate = Omit<Prisma.AvatarCreateInput, "profile">

export type IUser = Prisma.UserGetPayload<{}>
export type IProfile = Prisma.ProfileGetPayload<{}>
export type IAvatar = Prisma.AvatarGetPayload<{}>

export interface IToken {
    token: string
}
export interface TokenPayload {
	userId: number;
}
export interface IError {
    error: unknown
}

export type UserSecurityWithId = Omit<IUser, "password">
export type UserSecurity = Omit<UserSecurityWithId, "id">
export type UserLogin = {
    email:string,
    password:string
}

export interface IAvatarUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export interface IRepositoryContract {
    createUser: (user:UserCreate) => Promise<UserSecurityWithId | null>
    getUser: (email:string) => Promise<IUser | null> 
    getUserById: (id:number)=> Promise<UserSecurityWithId | null>
    createCode: (userId:number, code:number) => Promise<void>
    getCode: (code:number) => Promise<number | null>
    deleteCodeByUserId: (userId:number) => Promise<void>
    confirmUserById: (userId:number) => Promise<void>
    updateUser: (id: number, data: ProfileUpdate, avatar?: IAvatarUpload) => Promise<IProfile | null>
    createProfile: (id: number, data: ProfileCreate) => Promise<IProfile | null>
    avatar: (id: number,data: avatarCreate ) => Promise<IAvatar | null>
}

export interface IServiceContract {
    registation: (user:UserCreate) => Promise<string | IToken>
    login: (userData:UserLogin) => Promise<string | IToken>
    me: (id:number) => Promise<UserSecurity | string>
    secondPhaseOfRegistation: (code:number) => Promise<string | IToken>
    updateUser: (id: number, data: ProfileUpdate, avatar?: IAvatarUpload) => Promise<IProfile | string>
    createProfile: (id: number, data: ProfileCreate) => Promise<IProfile | string>
}

export interface IControllerContract {
    registation: (
        req: Request<{}, IToken | IError | string, UserCreate>, 
        res: Response<IToken | IError | string>,
        next: NextFunction
    ) => Promise<void>
    RegistrationSecondPhase: (
        req: Request<{code:number}, IToken | IError | string, {}>, 
        res: Response<IToken | IError | string>,
        next: NextFunction
    ) => Promise<void>
    login: (
        req: Request<{}, IToken | IError | string, UserLogin>, 
        res: Response<IToken | IError | string>,
        next: NextFunction
    ) => Promise<void>

    me: (
        req: Request<{}, UserSecurity | IError | string, {}>, 
        res: Response<UserSecurity | IError | string>,
        next: NextFunction
    ) => Promise<void>
    updateUser: (
        req: Request<{}, IProfile | IError | string, ProfileUpdate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
    createProfile: (
        req: Request<{}, IProfile | IError | string, ProfileCreate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
}
export default IServiceContract