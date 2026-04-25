import type{ Response, Request, NextFunction } from "express";
import Prisma from "../../config/prisma.ts";

type albumCreate = {
    title:string
    year:number
    topic:string
}
// type albumUpdate = Prisma.AlbumUpdateInput
type albumUpdate = {
    title?:string
    year?:number
    topic?:string
}
type albumOutput = Prisma.AlbumGetPayload<{
    omit:{
        profileId:true,
        topicId:true
    }
}>
type locals = {
    userId:number
    succsesStatus?: number
    data?: object | string
}
export interface ImageUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export type photoCreate = Omit<Prisma.AlbumPhotoCreateInput, "album">
export type albumPhoto = Prisma.AlbumPhotoGetPayload<{}>
export interface repositoryContract {
    createAlbum:(data: albumCreate, userId: number) => Promise<albumOutput>
    getAlbums:(userId: number) => Promise<albumOutput[] | null>
    updateAlbum: (data: albumUpdate, id: number) => Promise<albumOutput>
    addPhoto: (photo:photoCreate, id:number) => Promise<albumPhoto>
    deleteAlbum: (id:number) => Promise<albumOutput>
}
export interface serviceContract {
    createAlbum: (data: albumCreate, userId: number) => Promise<albumOutput | string>
    getAlbums: (userId: number) => Promise<albumOutput[] | string>
    updateAlbum: (data: albumUpdate, id: number,image?:ImageUpload) => Promise<albumOutput | string>
    deleteAlbum: (id:number,userId:number) => Promise<albumOutput>
}
export interface controllerContract {
    createAlbum: (
        req:Request<
            any,
            albumOutput,
            albumCreate,
            any,
            locals
            >,
        res:Response<albumOutput,locals>,
        next:NextFunction
    
    ) => Promise<void>
    getAlbums: (
        req:Request<
            any,
            albumOutput[],
            any,
            any,
            locals
            >,
        res:Response<albumOutput[],locals>,
        next:NextFunction
    
    ) => Promise<void>
    updateAlbum: (
        req:Request<
            {id:string},
            albumOutput,
            albumUpdate,
            any,
            locals
            >,
        res:Response<albumOutput | string,locals>,
        next:NextFunction
    
    ) => Promise<void>
    deleteAlbum: (
        req:Request<
            {id:string},
            albumOutput,
            any,
            any,
            locals
            >,
        res:Response<albumOutput | string,locals>,
        next:NextFunction
    
    ) => Promise<void>
}