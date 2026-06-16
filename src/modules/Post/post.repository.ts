import Prisma from "../../config/prismaClient.ts";
import type { IRepositoryContract } from "./post.types.ts";

export const PostRepository: IRepositoryContract = {
	async create(data, userId, images) {
		try {
			return Prisma.post.create({
				data: {
					created_at: new Date(),
					authorId: userId,
					title: data.title,
					content: data.content,
					...(data.tags && {
						tags: {
							create: data.tags.map((tagName: string) => ({
								tag: {
									create: { name: tagName },
								},
							})),
						},
					}),
					...(data.links && {
						links: {
							createMany: {
								data: data.links.map((link: string) => ({
									url: link,
								})),
							},
						},
					}),
					...(images && {
						images: {
							createMany: {
								data: images.map((image) => ({
									compressed_image: image,
									original_image: image,
								})),
							},
						},
					})
				},
			});
		} catch (error) {
			throw error;
		}
	},
	async get(userId, skip) {
		try {
			const posts = await Prisma.post.findMany({
				take: 5,
				skip: skip,
				include: {
					author: {
						include: {
							profile: true,
						},
					},
					tags: {
						select: {
							tag: {
								select: { name: true },
							},
						},
					},
					images: {
						select: {
							compressed_image: true,
							original_image: true,
						},
					},
					links: {
						select: {
							url: true,
						},
					},
					_count: {
						select: {
							likes: true,
							views: true,
							hearts: true,
						},
					},
				},
			});

			await Promise.all(
				posts.map((post) =>
					Prisma.post.update({
						where: { id: post.id },
						data: {
							views: {
								connectOrCreate: {
									where: {
										userId_postId: {
											postId: post.id,
											userId: userId,
										},
									},
									create: {
										userId: userId,
									},
								},
							},
						},
					}),
				),
			);
			return posts;
		} catch (error) {
			throw error;
		}
	},
	async getByUser(userId) {
		try {
			const posts = await Prisma.post.findMany({
				where: {
					authorId: userId,
				},
				include: {
					author: {
						include: {
							profile: true,
						},
					},
					tags: {
						select: {
							tag: {
								select: { name: true },
							},
						},
					},
					images: {
						select: {
							compressed_image: true,
							original_image: true,
						},
					},
					links: {
						select: {
							url: true,
						},
					},
					_count: {
						select: {
							likes: true,
							views: true,
							hearts: true,
						},
					},
				},
			});
			return posts;
		} catch (error) {
			throw error;
		}
	},
	async update(id, userId, data, images) {
		try {
			const posts = await Prisma.post.update({
				where: {
					authorId: userId,
					id: id,
				},
				data: {
					...(data.title && { title: data.title }),
					...(data.content && { title: data.content }),
					...(data.tags && {
						connectOrCreate: data.tags.map((tag) => ({
							where: { name: tag },
							create: { name: tag },
						})),
					}),
					...(data.links && {
						links: {
							createMany: {
								data: data.links.map((link) => ({
									url: link,
								})),
							},
						},
					}),
					...(images && {
						images: {
							createMany: {
								data: images.map((filename) => ({
									original_image: filename,
									compressed_image: filename,
								})),
							},
						},
					}),
				},
			});
			return posts;
		} catch (error) {
			throw error;
		}
	},
	async action(id, userId, action) {
		try {
			const post = await Prisma.post.update({
				where: {
					authorId: userId,
					id: id,
				},
				data: {
					likes: action.like
						? {
								create: { userId: userId },
							}
						: {
								deleteMany: {
									userId: userId,
									postId: id,
								},
							},

					hearts: action.love
						? {
								create: { userId: userId },
							}
						: {
								deleteMany: {
									userId: userId,
									postId: id,
								},
							},
				},
			});
			return post;
		} catch (error) {
			throw error;
		}
	},
	async delete(id, userId) {
		try {
			await Prisma.postTags.deleteMany({ where: { postId:id } });
			await Prisma.postHeart.deleteMany({ where: { postId:id } });
			await Prisma.postLike.deleteMany({ where: { postId:id } });
			await Prisma.postView.deleteMany({ where: { postId:id } });
			await Prisma.postImage.deleteMany({ where: { postId:id } });
			await Prisma.postLink.deleteMany({ where: { postId:id } });
			const post = await Prisma.post.delete({
				where: {
					authorId: userId,
					id: id,
				},
			});
			// return post;
		} catch (error) {
			throw error;
		}
	},
};
