import { env } from "../../config/env.ts"
import jwt from "jsonwebtoken";
import { UserService } from "./user.service.ts"
import type { IControllerContract, TokenPayload } from "./user.types.ts"

export const UserController:IControllerContract = {
    registation: async (req, res) => {
        try {
            const user = req.body
            const result = await UserService.registation(user)
            res.status(201).json(result)
            
        } catch (error) {
            res.status(500).json({ error })
        }
    },

    login: async (req, res) => {
        try {
            const userData = req.body
            const result = await UserService.login(userData)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    me: async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                res.status(401).json({ error: "No token provided" })
                return
            }
            const userId = (jwt.verify(token, env.SECRET_KEY) as TokenPayload).userId
            if (!userId) {
                res.status(401).json({ error: "Invalid token" })
                return
            }
            const result = await UserService.me(userId)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}