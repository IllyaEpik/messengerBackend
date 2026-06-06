import Prisma from "../../config/prismaClient.ts"
import type { IRepositoryContract } from "./types/user.contract.ts"

export const UserRepository:IRepositoryContract = {
    createUser: async (userData) => {
        ok()
        try {
            // 0/0
            console.log(userData)
            const createdUser = await Prisma.user.create({
                data: {
                    ...userData,
                    is_superuser: false,
                    is_staff: false,
                    is_active: true,
                    first_name: '',
                    last_name: '',
                    date_joined: new Date(),
                }
            })
            console.log(userData, createdUser)
            return createdUser
        } catch (error) {
            console.log(error)
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
    const { username, pseudonym } = data;

    // Use transaction to update user and upsert profile atomically
    return await Prisma.$transaction(async (tx) => {
        // Update user's username if provided
        if (username) {
            await tx.user.update({
                where: { id },
                data: { username }
            });
        }

        // Upsert profile: create if not exists, otherwise update pseudonym and avatar
        const profile = await tx.profile.create({
            data: {
                userId: id,
                pseudonym,
                avatar: "/avatar.png",
                is_text_signature: false,
                is_image_signature: false,
                
            }
        });

        return profile;
    });
},
    async sendFriendRequest(fromUserId, toUserId) {
        
        await Prisma.friendsRequest.create({
            data: {
                to_user_id: toUserId,
                from_user_id: fromUserId,
                status:"pending",
                created_at: new Date()
            }
        })
    },
    async confirmFriendRequest(fromUserId, toUserId) {
        const existingRequest = await Prisma.friendsRequest.findUnique({
            where: {
                from_user_id_to_user_id: {
                    from_user_id: fromUserId,
                    to_user_id: toUserId
                }
            }
        });

        // 2. Check if the request even exists
        if (!existingRequest) {
            throw new Error("Friend request not found.");
        }

        // 3. Check the current status
        if (existingRequest.status === "accepted") {
            throw new Error ("You are already friends!")
        }

        if (existingRequest.status === "declined") {
            throw new Error("This request was previously declined.");
        }
        await Prisma.friendsRequest.update({
            where: { 
                from_user_id_to_user_id: {
                    from_user_id: fromUserId,
                    to_user_id: toUserId
                }
            },
            data: {
                status: "accepted"
            }
        })
    },
    async getFriends(userId) {
        const friends = await Prisma.friendsRequest.findMany({
            where: {
                OR: [
                    { to_user_id: userId },    // Incoming requests
                    { from_user_id: userId },   // Outgoing requests
                ],
                status:"accepted"
            },
            include: {
                from_user: {
                select: {
                    id:true,
                    profile:{
                        select:{
                            birth_date: true,
                            signature: true,
                            avatar: true,
                            pseudonym: true,
                            userId: true,
                            is_image_signature: true,
                            is_text_signature: true

                        }

                    }
                }
            },
            to_user: {
                select: {
                    id:true,
                    profile:{
                        select:{
                            birth_date: true,
                            signature: true,
                            avatar: true,
                            pseudonym: true,
                            userId: true,
                            is_image_signature: true,
                            is_text_signature: true
                        }
                    }
                }
            }
            }
        })
        if (!friends) return []
        const friendsOnly = friends.map(request => request.from_user_id === userId ? request.to_user : request.from_user)
        const prettyFriends = friendsOnly.map(friend => {
            const profile = friend.profile;
            return {id: friend.id,
            birth_date: profile?.birth_date ?? null,
            signature: profile?.signature ?? null,
            avatar: profile?.avatar ?? "media/avatar.png",
            pseudonym: profile?.pseudonym ?? "User",
            userId: friend.id,
            is_image_signature: profile?.is_image_signature ?? false,
            is_text_signature: profile?.is_text_signature ?? false
        }
        })
        return prettyFriends
    },
    async getRecommendedFriends(userId, exceptions) {
        // Get current user's friends
        // const userProfile = await Prisma.profile.findUnique({
        //     where: { userId },
        //     select: {
        //         friends: { select: { userId: true } },
        //         friendOf: { select: { userId: true } }
        //     }
        // })

        // const friendIds = userProfile 
        //     ? [
        //         ...userProfile.friends.map(f => f.userId),
        //         ...userProfile.friendOf.map(f => f.userId)
        //       ]
        //     : []

        // Get pending friend requests (incoming and outgoing)
        const friendRequests = await Prisma.friendsRequest.findMany({
            where: {
                OR: [
                    { to_user_id: userId },    // Incoming requests
                    { from_user_id: userId }   // Outgoing requests
                ]
            },
            select: {
                to_user_id: true,
                from_user_id: true
            },
            take:15
        })

        const requestUserIds = friendRequests.flatMap(req => [
            req.to_user_id,
            req.from_user_id
        ])

        // Exclude: current user, friends, pending requests, and exceptions
        const excludedIds = [userId, ...requestUserIds, ...exceptions]
        const recommendedFriends = await Prisma.profile.findMany({
            where: {
                userId: {
                    notIn: excludedIds
                },
                
            }
        })
        return recommendedFriends
    },
    // npx prisma db pull --print
    async getFriendRequests(userId) {
        const requests = await Prisma.friendsRequest.findMany({
            where: {
                status:"pending",
                to_user_id: userId
            },
            include: {
                from_user: {
                    select: {
                        id:true,
                        profile:{
                            select:{
                                birth_date: true,
                                signature: true,
                                avatar: true,
                                pseudonym: true,
                                userId: true,
                                is_image_signature: true,
                                is_text_signature: true
                            }

                        }
                    }
                },
                
            }
        })
        return requests.map(request => {
        const profile = request.from_user.profile;

        return {
            // Include the top-level request ID so you can accept/reject it later
            requestId: request.id, 
            
            // Map the sender's profile safely
            id: request.from_user.id,
            birth_date: profile?.birth_date ?? null,
            signature: profile?.signature ?? null,
            avatar: profile?.avatar ?? "",
            pseudonym: profile?.pseudonym ?? "User",
            userId: profile?.userId ?? request.from_user.id,
            is_image_signature: profile?.is_image_signature ?? false,
            is_text_signature: profile?.is_text_signature ?? false
        };
    });
    },
    async deleteFriend(userId, friendId) {
        const friendship = await Prisma.friendsRequest.findFirst({
        where: {
            // status: "accepted",
            OR: [
                { from_user_id: userId, to_user_id: friendId },
                { from_user_id: friendId, to_user_id: userId }
            ]
        }
        });

        // 2. If no active friendship exists, throw an error or just return
        if (!friendship) {
            throw new Error("You are not friends with this user.");
        }

        // 3. Delete it using the unique ID found
        await Prisma.friendsRequest.delete({
            where: { id: friendship.id }
        });
    },
    async removeRecommendations(userId, friendId) {
        await Prisma.friendsRequest.create({
            data: {

                to_user_id: friendId,
                from_user_id: userId,
                status:"declined",
                created_at: new Date()
                
            }
        })
    },
    async getfriendById(userId) {
        const user = await Prisma.user.findUnique({
            where:{
                id:userId
            },
            include:{
                profile:{
                    include:{
                        albums:{
                            include:{
                                albumImage:true
                            }
                        }
                    }
                },
                posts: {
                    select: {
                        _count: {
                        select: { views: true, likes: true, hearts: true }
                        }
                    }
                },
                _count: {
                    select: {
                        sentRequests: {
                            where: { status: "accepted" },
                        },
                        receivedRequests: {
                            where: { status: "accepted" },
                        },
                        posts:true
                    },
                },  
            }
        })
        return user
    },
    async getAllUsers(){
        return await Prisma.user.findMany()
    }
    // async remove
}
async function ok() {
    console.log(
        await Prisma.user.findMany()
    )
}