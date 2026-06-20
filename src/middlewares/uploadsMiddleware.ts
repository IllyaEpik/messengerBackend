// import { ValidationError } from "../errors/app-errors";
import { join } from "node:path";
import multer, { memoryStorage } from "multer";
import sharp from "sharp";

import type { NextFunction, Request, Response } from "express";
import { originalDir, thumbDir } from "../config/path.ts";
import { v2 as cloudinary } from "cloudinary";

export const uploadsMiddleware = multer({ storage: memoryStorage() });

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

export function procImagesMiddleware(width: number, quality: number) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			let files = [] as Express.Multer.File[];
			if (Array.isArray(req.files)) {
				files = req.files;
			} else if (req.files && typeof req.files === 'object') {
				// Flatten all values (each is an array of files)
				for (const field in req.files) {
				if (Array.isArray(req.files[field])) {
					files.push(...req.files[field]);
				}
				}
			}
			if (!files || files.length === 0) {
				return next(); // Or handle as an error
			}
			console.log(files, typeof files);
			await Promise.all(
				files.map(async (image) => {
					const fileName = `${Date.now()}`;
					// const filePathOriginal = join(originalDir, fileName);
					// const filePathThumb = join(thumbDir, fileName);

					// await sharp(image.buffer).toFile(filePathOriginal);
					// await sharp(image.buffer)
					// 	.resize({ width })
					// 	.jpeg({ quality })
					// 	.toFile(filePathThumb);

					const buffer = await sharp(image.buffer)
						.jpeg({ quality })
						.toBuffer();
					await uploadToCloudinary(buffer, fileName);
					image.filename = fileName;
					return image;
				}),
			);

			// req.files.filename = fileName
			next();
		} catch (error) {
			next(error);
		}
	};
}
