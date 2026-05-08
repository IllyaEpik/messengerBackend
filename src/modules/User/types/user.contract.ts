import { Request, Response, NextFunction } from "express";
import type{ 
    UserCreate, 
    UserLogin, 
    UserSecurity, 
    UserSecurityWithId, 
    IProfile, 
    ProfileCreate, 
    ProfileUpdate, 
    IToken, 
    IError, 
    updateProfileFile,
    IUser,
    gottenFriends
 } from "./user.types.ts";
export interface IRepositoryContract {
    createUser: (user:UserCreate) => Promise<UserSecurityWithId | null>
    getUser: (email:string) => Promise<IUser | null> 
    getUserById: (id:number)=> Promise<UserSecurityWithId | null>
    createCode: (userId:number, code:number, expiresAt: Date) => Promise<void>
    getCode: (code: number) => Promise<number | null>
    deleteCodeByUserId: (userId:number) => Promise<void>
    //confirmUserById: (userId:number) => Promise<void>
    updateUser: (id: number, data: ProfileUpdate, avatar?: updateProfileFile) => Promise<IProfile | null>
    createProfile: (id: number, data: ProfileCreate) => Promise<IProfile | null>
    sendFriendRequest: (fromUserId: number, toUserId: number) => Promise<void>
    confirmFriendRequest: (fromUserId: number, toUserId: number) => Promise<void>
    getFriends: (userId: number) => Promise<IProfile[]>
    getRecommendedFriends: (userId: number) => Promise<IProfile[]>
    getFriendRequests: (userId: number) => Promise<IProfile[]>
    // deleteFriend: (userId: number, friendId: number) => Promise<void>
}

export interface IServiceContract {
    registation: (user:UserCreate) => Promise<string | IToken>
    login: (userData:UserLogin) => Promise<string | IToken>
    me: (id:number) => Promise<UserSecurity | string>
    secondPhaseOfRegistation: (code:number) => Promise<string | IToken>
    updateUser: (id: number, data: ProfileUpdate, files?: updateProfileFile) => Promise<IProfile | string>
    createProfile: (id: number, data: ProfileCreate) => Promise<IProfile | string>
    sendFriendRequest: (fromUserId: number, toUserId: number) => Promise<void | string>
    confirmFriendRequest: (fromUserId: number, toUserId: number) => Promise<void >
    getFriends: (userId: number) => Promise<gottenFriends | string>
    // deleteFriend: (userId: number, friendId: number) => Promise<void>
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

    sendFriendRequest: (
        req: Request<{
            profile: string
        }, IProfile | IError | string, ProfileCreate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
    confirmFriendRequest: (
        req: Request<{
            fromUserId: string
        }, IProfile | IError | string, ProfileCreate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
    getFriends: (
        req: Request<{}, IProfile[] | IError | string, {}>, 
        res: Response<IProfile[] | IError | string>,
        next: NextFunction
    ) => Promise<void>
    // deleteFriend: (
    //     req: Request<{}, IProfile | IError | string, {}>, 
    //     res: Response<IProfile | IError | string>,
    //     next: NextFunction
    // ) => Promise<void>
}