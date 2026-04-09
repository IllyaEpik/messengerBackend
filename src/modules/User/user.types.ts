import type{ Response, Request } from "express";
import Prisma from "../../config/prisma.ts";

export type UserCreate = Prisma.UserCreateInput
export type IUser = Prisma.UserGetPayload<{}>

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

export interface IRepositoryContract {
    createUser: (user:UserCreate) => Promise<UserSecurityWithId | null>
    getUser: (email:string) => Promise<IUser | null> 
    getUserById: (id:number)=> Promise<UserSecurityWithId | null>
}

export interface IServiceContract {
    registation: (user:UserCreate) => Promise<string | IToken>
    login: (userData:UserLogin) => Promise<string | IToken>
    me: (id:number) => Promise<UserSecurity | string>
}

export interface IControllerContract {
    registation: (
        req: Request<{}, IToken | IError | string, UserCreate>, 
        res: Response<IToken | IError | string>
    ) => Promise<void>

    login: (
        req: Request<{}, IToken | IError | string, UserLogin>, 
        res: Response<IToken | IError | string>
    ) => Promise<void>

    me: (
        req: Request<{}, UserSecurity | IError | string, IToken>, 
        res: Response<UserSecurity | IError | string>
    ) => Promise<void>
}
export default IServiceContract