// import { ValidationError } from "../errors/app-errors";
import { join } from "node:path";
import multer, { memoryStorage } from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import type { NextFunction, Request, Response } from "express";
// import { originalDir, thumbDir } from "../config/path.ts";

export const uploadMiddleware = multer({ storage: memoryStorage() });

function uploadToCloudinary(buffer: Buffer, fileName: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: fileName,
          folder: "thumb",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
      .end(buffer);
  });
}

export function procImgMiddleware(width: number, quality: number) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.file);
			if (!req.file) {
				res.locals.data = "file validation error";
				next();
				return;
			}
			console.log();
			const fileName = `${Date.now()}`;
			//const filePathOriginal = join(originalDir, fileName);
			//const filePathThumb = join(thumbDir, fileName);

			// await sharp(req.file.buffer).toFile(filePathOriginal);
			// await sharp(req.file.buffer)
			// 	.resize({ width })
			// 	.jpeg({ quality })
			// 	.toFile(filePathThumb);
			const buffer = await sharp(req.file.buffer)
				.jpeg({ quality })
				.toBuffer();
			await uploadToCloudinary(buffer, fileName);
			req.file.filename = fileName;
			next();
		} catch (error) {
			next(error);
		}
	};
}
