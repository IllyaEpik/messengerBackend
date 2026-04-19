import Prisma from "../../config/prismaClient.ts"
import type { IRepositoryContract } from "./user.types.ts"

export const UserRepository:IRepositoryContract = {
    createUser: async (userData) => {
        try {
            const createdUser = await Prisma.user.create({
                data: userData
            })
            return createdUser
        } catch (error) {
            return null
        }
    },

    getUser: async (email) => {
        try {
            const user = await Prisma.user.findUnique({
                where: { email }
            })
            return user
        } catch (error) {
            console.error("Error fetching user by email:", error)
            return null
        }
    },

    getUserById: async (id) => {
        try {
            const user = await Prisma.user.findUnique({
                where: { id },
                include:{
                    profile:
                    {include: {
                        avatar: true,
                    }}
                }
            })
            if (!user) return null
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        } catch (error) {
            console.error("Error fetching user by ID:", error)
            return null
        }
    },
    getCode: async (code) => {
        const codeFromDB = await Prisma.code.findUnique({
            where: { code },
            select: { userId: true }
        })
        if (!codeFromDB) return null
        return codeFromDB.userId
    },
    createCode: async (userId, code) => {
        await Prisma.code.create({
            data: {
                code,
                userId
            }
        })
    },
    deleteCodeByUserId: async (userId) => {

        await Prisma.code.delete({
            where: { userId }
        })
    },
    confirmUserById: async (userId) => {

        await Prisma.user.update({
            where: { id: userId },
            data: { confirmedUser: true }
        })
    },
    updateUser: async (id, data) => {
        return Prisma.profile.update({
            where: { userId: id },
            data: data
        }) || null
    },
    createProfile: async (id, data) => {
        return Prisma.profile.create({
            data: {
                ...data,
                userId:id
            }
        }) || null
    },
    avatar: async (id,data) => {
        return Prisma.avatar.create({
            data:{
                profile:{
                    connect: {
                        userId: id
                    }
                },
                avatar:data.avatar,
                crackedAvatar: data.crackedAvatar
            }
        })
    }
}      