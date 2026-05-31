import type{ Response, Request, NextFunction } from "express";
import Prisma from "../../../config/prisma.ts";
import { IPost } from "../../Post/post.types.ts";

export interface UserCreate {
    email: string,
    password: string
}
export interface IError {
    error: unknown
}
export interface IToken {
    token: string
}
export interface UserLogin {
    email: string,
    password: string
}

export type IUser = Prisma.UserGetPayload<{}>
export type UserSecurity = Omit<IUser, "password">
export type UserSecurityWithId = Omit<UserSecurity, "id"> & { id: bigint }
export type IProfile = Prisma.ProfileGetPayload<{
    // include: {
    //     is_image_signature
    // }
}>
export interface friendInfoOutput {
    readers: number
    frieds:number
    posts:number
    username: string
    pseudonym: string
    avatar: string
    albums:{
        photos:string[]
        theme:string
        name:string
        year:number
    }[]
}
export type userInfo = Prisma.UserGetPayload<{
    include:{
        profile:{
            include:{
                albums:{
                    include:{
                        albumImage: true
                    }
                }
            }
        },
        posts: {
            select: {
                _count: {
                select: { views: true, likes: true, hearts: true }
                }
            }
        },
        _count: {
            select: {
                sentRequests: {
                    where: { status: "accepted" },
                },
                receivedRequests: {
                    where: { status: "accepted" },
                },
                posts:true
            },
        },  
    }
}>
// export type ProfileCreate = Omit<IProfile, "id" | "userId" | "avatar"> & { username: string }
export type ProfileUpdate = Partial<ProfileCreate> & { username?: string }
export type ProfileCreate = {
    pseudonym: string,
    username: string
}

export interface gottenFriends {
    friends: IProfile[],
    friendRequests: IProfile[],
    friendsRecommneds: IProfile[]
}

export type updateProfileFile = {
    avatar?: Express.Multer.File[],
    electronicSignature?: Express.Multer.File[]
}