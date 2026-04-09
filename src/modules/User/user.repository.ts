import Prisma from "../../config/prismaClient.ts"
import type { IRepositoryContract } from "./user.types.ts"

export const UserRepository:IRepositoryContract = {
    createUser: async (user) => {
        try {
            const createdUser = await Prisma.user.create({
                data: user
            })
            return createdUser
        } catch (error) {
            console.error("Error creating user:", error)
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
                where: { id }
            })
            if (!user) return null
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        } catch (error) {
            console.error("Error fetching user by ID:", error)
            return null
        }
    }
}       