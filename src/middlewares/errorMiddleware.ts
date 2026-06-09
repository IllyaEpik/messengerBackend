import { AppError } from "../errors/app-errors.ts";
import type { NextFunction, Request, Response } from "express";

export function errorMiddleware(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (error instanceof AppError) {
		res.status(Number(error.code)).json(error.message);
		return;
	}
	res.status(500).json({
		message: "Internal Server Error",
	});
}
