import type{ repositoryContract } from "./album.types.ts";
import Prisma from "../../config/prismaClient.ts"

export const albumRepository: repositoryContract = {
    async getAlbums(userId) {
        try {
            const profile = await Prisma.profile.findUnique({
                where:{
                    userId
                },
                select:{
                    albums:{
                        select:{
                            title:true,
                            year:true,
                            visible:true,
                            id:true,
                            topic:{
                                select:{
                                    name:true
                                }
                            },
                            photos:{
                                select:{
                                    photo:true,
                                    crackedPhoto:true,
                                    visible:true
                                }
                            }
                        }
                    }
                }
            })

            return profile?.albums || null
        } catch (error) {
            throw error
        }
    },
    async createAlbum(data, userId) {
        try {
            const albums = await Prisma.album.create({
                data:{
                    profile: {
                        connect:{
                            userId
                        }
                    },
                    year:data.year,
                    topic: {
                        connectOrCreate:{
                            create:{
                                name:data.topic
                            },
                            where: {
                                name:data.topic
                            }
                        }
                    },
                    title:data.title
                },
                omit:{
                    profileId:true
                }
            })

            return albums
        } catch (error) {
            throw error
        }
    },
    async updateAlbum(data, id) {
        try {
            console.log(data)
            const topic = data.topic
            const albums = await Prisma.album.update({
                where:{
                    id:id
                },
                data:{
                    ...(data.title && {title:data.title}),
                    ...(data.year && {year:data.year}),
                    ...(topic && {topic: {
                        connectOrCreate:{
                            create:{
                                name:topic
                            },
                            where:{
                                name:topic
                            },
                        }
                    }})
                },
                omit:{
                    profileId:true
                }
            })

            return albums
        } catch (error) {
            throw error
        }
    },
    async addPhoto(photo, id) {
        return await Prisma.albumPhoto.create({
            data:{
                album:{
                    connect: {
                        id: id
                    }
                },
                photo: photo.photo ?? null,
                crackedPhoto: photo.crackedPhoto ?? null,
                visible:true
            }
        })
    },
    async deleteAlbum(id) {
        return await Prisma.album.delete({
            where:{
                id:id
            },
            include:{
                photos:{
                    select:{
                        photo:true,
                        crackedPhoto:true,
                        visible:true
                    }
                },
                topic:true
            }
        })
    },
}