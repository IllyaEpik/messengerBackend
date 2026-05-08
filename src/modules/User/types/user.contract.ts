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
}

export interface IServiceContract {
    registation: (user:UserCreate) => Promise<string | IToken>
    login: (userData:UserLogin) => Promise<string | IToken>
    me: (id:number) => Promise<UserSecurity | string>
    secondPhaseOfRegistation: (code:number) => Promise<string | IToken>
    updateUser: (id: number, data: ProfileUpdate, files?: updateProfileFile) => Promise<IProfile | string>
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

    sendRequest: (
        req: Request<{}, IProfile | IError | string, ProfileCreate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
    confirmRequest: (
        req: Request<{}, IProfile | IError | string, ProfileCreate>, 
        res: Response<IProfile | IError | string>,
        next: NextFunction
    ) => Promise<void>
    // getFriends: (
    //     req: Request<{}, IProfile[] | IError | string, {}>, 
    //     res: Response<IProfile[] | IError | string>,
    //     next: NextFunction
    // ) => Promise<void>
    // getFriendRequests: (
    //     req: Request<{}, IProfile[] | IError | string, {}>, 
    //     res: Response<IProfile[] | IError | string>,
    //     next: NextFunction
    // ) => Promise<void>
    // deleteFriend: (
    //     req: Request<{}, IProfile | IError | string, {}>, 
    //     res: Response<IProfile | IError | string>,
    //     next: NextFunction
    // ) => Promise<void>
}