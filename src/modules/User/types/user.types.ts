import type{ Response, Request, NextFunction } from "express";
import Prisma from "../../../config/prisma.ts";

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
export type UserSecurityWithId = Omit<UserSecurity, "id"> & { id: number }
export type IProfile = Prisma.ProfileGetPayload<{}>
export type ProfileCreate = Omit<IProfile, "id" | "userId" | "avatar"> & { username: string }
export type ProfileUpdate = Partial<ProfileCreate> & { username?: string }

export type updateProfileFile = {
    avatar?: Express.Multer.File[],
    electronicSignature?: Express.Multer.File[]
}