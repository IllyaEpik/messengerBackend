// import { ValidationError } from "../errors/app-errors";
import {join} from "node:path"
import multer, { memoryStorage } from "multer"
import sharp from "sharp";

import type { NextFunction, Request, Response } from "express";
import { originalDir, thumbDir } from "../config/path.ts";


export const uploadsMiddleware = multer({ storage: memoryStorage() })


export function procImagesMiddleware(width: number, quality:number){
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                next() // Or handle as an error
            }
            await Promise.all(
                files.map(async (image) => {
                    const fileName = `${Date.now()}.jpg`
                    const filePathOriginal = join(originalDir, fileName);
                    const filePathThumb = join(thumbDir, fileName);
                    
                    await sharp(image.buffer).toFile(filePathOriginal)
                    await sharp(image.buffer).resize({width}).jpeg({quality}).toFile(filePathThumb)
                    image.filename = fileName
                    return image
            }))
            
            // req.files.filename = fileName
            next()
        } catch (error) {
            next(error)
        }
        
    }
}