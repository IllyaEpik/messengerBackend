import type{ NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import type{ UserSecurity, IError, UserCreate, TokenPayload } from "../modules/User/user.types.ts";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    console.log(authHeader,12)
    if (!authHeader) {
        res.status(401).json({ error: "No token provided" })
        return
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Invalid authorization format" });
        return
    }
    const decoded = jwt.verify(token, env.SECRET_KEY) as unknown as TokenPayload;
    const userId = decoded.userId;
    if (!userId) {
        res.status(401).json({ error: "Invalid token" })
        return
    }
    console.log(userId,3223)
    res.locals.userId = userId
    next()
}