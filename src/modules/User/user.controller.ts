import { env } from "../../config/env.ts"
import jwt from "jsonwebtoken";
import { UserService } from "./user.service.ts"
import type { IControllerContract, TokenPayload } from "./user.types.ts"

export const UserController:IControllerContract = {
    registation: async (req, res, next) => {

            console.log("reg1 controller result:")
        try {
            const user = req.body
            const result = await UserService.registation(user)
            res.locals.data = result
            res.locals.succsesStatus = 201
            next()
        } catch (error) {
            // console
            res.status(500).json({ error })
        }
    },
    RegistrationSecondPhase: async (req, res, next) =>{

        console.log("reg2 controller result:")
        try {
            const code = Number(req.params.code)
            const result = await UserService.secondPhaseOfRegistation(code)
            res.locals.data = result
            res.locals.succsesStatus = 201
            next()
        } catch (error) {
            res.status(500).json({ error })
        }
    },

    login: async (req, res, next) => {
            console.log("login controller result:")
        try {
            console.log("ok")
            const userData = req.body
            console.log("ok1")
            const result = await UserService.login(userData)
            console.log("ok2")
            res.locals.data = result
            console.log("ok3", result)
            next()
            console.log("ok35")
        } catch (error) {
            console.log("ok4")
            res.status(500).json({ error })
        }
    },
    me: async (req, res,next) => {
        console.log("me controller called",res.locals.userId)
        try {
            const userId = Number(res.locals.userId)
            const result = await UserService.me(userId)
            res.locals.data = result
            next()
        } catch (error) {
            console.error("Error in me controller:", error)
            res.status(500).json({ error })
        }
    },
    updateUser: async (req,res,next) => {
        console.log("update controller called")
        try {
            const userUpdateData = req.body
            const userId = res.locals.userId
            const avatarFile = req.file
            const result = await UserService.updateUser(userId, userUpdateData, avatarFile)
            res.locals.data = result
            
            next()
        } catch (error) {
            console.error("Error in me controller:", error)
            res.status(500).json({ error })
        }
    },
    createProfile: async (req, res,next) => {
        console.log("me controller called",res.locals.userId)
        try {
            const profileCreateData = req.body
            
            const userId = Number(res.locals.userId)
            const result = await UserService.createProfile(userId,profileCreateData)
            res.locals.data = result
            next()
        } catch (error) {
            console.error("Error in me controller:", error)
            res.status(500).json({ error })
        }
    },
}