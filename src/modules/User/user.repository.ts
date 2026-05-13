import Prisma from "../../config/prismaClient.ts"
import type { IRepositoryContract } from "./types/user.contract.ts"

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
                    profile: true
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
        const codeFromDB = await Prisma.emailVerification.findUnique({
            where: { code: String(code) },
            select: { userId: true }
        })
        if (!codeFromDB) return null
        return codeFromDB.userId
    },
    createCode: async (userId, code, expiresAt) => {
        await Prisma.emailVerification.create({
            data: {
                code: String(code),
                userId,
                expiresAt
            }
        })
    },
    deleteCodeByUserId: async (userId) => {

        await Prisma.emailVerification.delete({
            where: { userId }
        })
    },
    updateUser: async (id, data) => {
        const { username, ...profileData } = data
        if (data.username) Prisma.user.update({
            where: { id },
            data: data
        }) || null
    
        return Prisma.profile.update({
            where: { userId: id },
            data: profileData
        }) || null
    },
    createProfile: async (id, data) => {
        const { username, ...profileData } = data
        if (data.username) Prisma.user.update({
            where: { id },
            data: {username}
        }) || null
        return Prisma.profile.create({
            data: {
                ...profileData,
                userId:id,
                avatar: "media/avatar.png"
            }
        }) || null
    },
    async sendFriendRequest(fromUserId, toUserId) {
        
        await Prisma.friendsRequest.create({
            data: {
                toProfileId: toUserId,
                fromProfileId: fromUserId
            }
        })
    },
    async confirmFriendRequest(fromUserId, toUserId) {
        await Prisma.friendsRequest.deleteMany({
            where: {
                toProfileId: toUserId,
                fromProfileId: fromUserId
            }
        })
        await Prisma.profile.update({
            where: { userId: fromUserId },
            data: {
                friends: {
                    connect: { userId: toUserId }
                }
            }
        })
    },
    async getFriends(userId) {
        const friends = await Prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                friendOf: true,
                friends: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
        if (!friends) return []
        return friends.friendOf.concat(friends.friends)
    },
    async getRecommendedFriends(userId) {
        // const friends = await this.getFriends(userId)
        // const friendIds = friends.map(friend => friend.userId)
        // const recommendedFriends = await Prisma.profile.findMany({
        //     where: {
        //         userId: {
        //             notIn: [userId, ...friendIds]
        //         }
        //     }
        // })
        const recommendedFriends = await Prisma.profile.findMany({
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
        return recommendedFriends
    },
    async getFriendRequests(userId) {
        const requests = await Prisma.friendsRequest.findMany({
            where: {
                toProfileId: userId
            },
            include: {
                fromProfile: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                
            }
        })
        return requests.map(request => request.fromProfile)
    },
    // async deleteFriend(userId, friendId) {
    //     await Prisma.profile.update({
    //         where: {
    //             OR: [
    //                 { user1Id: userId, user2Id: friendId },
    //                 { user1Id: friendId, user2Id: userId }
    //             ]
    //         }
    //     })
    // }
}      