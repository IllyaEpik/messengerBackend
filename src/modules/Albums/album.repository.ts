import type { repositoryContract } from "./album.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const albumRepository: repositoryContract = {
	async getAlbums(userId) {
		try {
			const profile = await Prisma.profile.findUnique({
				where: {
					userId,
				},
				select: {
					albums: {
						select: {
							name: true,
							year: true,
							is_shown: true,
							id: true,
							theme: true,
						},
						include: {
							albumImage: {
								select: {
									image: true,
									is_shown: true,
								},
							},
						},
					},
				},
			});

			return profile?.albums || null;
		} catch (error) {
			throw error;
		}
	},
	async createAlbum(data, userId) {
		try {
			const albums = await Prisma.album.create({
				data: {
					profile: {
						connect: {
							userId,
						},
					},
					year: data.year,
					theme: data.topic,
					name: data.title,
					is_default: false,
					is_shown: true,
					created_at: new Date(),
				},
				omit: {
					profileId: true,
				},
			});

			return albums;
		} catch (error) {
			throw error;
		}
	},
	async updateAlbum(data, id) {
		try {
			const topic = data.topic;
			const albums = await Prisma.album.update({
				where: {
					id: id,
				},
				data: {
					...(data.title && { title: data.title }),
					...(data.year && { year: data.year }),
					...(topic && {
						topic: {
							connectOrCreate: {
								create: {
									name: topic,
								},
								where: {
									name: topic,
								},
							},
						},
					}),
				},
				omit: {
					profileId: true,
				},
			});

			return albums;
		} catch (error) {
			throw error;
		}
	},
	async addPhoto(photo, id) {
		return await Prisma.albumImage.create({
			data: {
				album: {
					connect: {
						id: id,
					},
				},
				image: photo.image ?? null,
				is_shown: true,
				created_at: new Date(),
			},
		});
	},
	async deleteAlbum(id) {
		return await Prisma.album.delete({
			where: {
				id: id,
			},
			include: {
				albumImage: {
					select: {
						image: true,
						is_shown: true,
					},
				},
			},
		});
	},
};
