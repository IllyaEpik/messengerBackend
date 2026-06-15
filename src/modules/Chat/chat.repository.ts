import type { IChatRepository } from "./chat.types.ts";
import Prisma from "../../config/prismaClient.ts";

export const chatRepository: IChatRepository = {
	create: async (data) => {
		try {
			const chat = await Prisma.chat.create({
				data,
				select: {
					participants: {
						include: {
							user: {
								select: {
									username: true,
									id: true,
								},
							},
						},
					},
					admin: true,
					id: true,
					name: true,
					avatar: true,
					is_group: true,
					adminId: true,
					messages: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							text: true,
							created_at: true,
						},
					},
					_count: {
						select: {
							messages: true
						}
					}
				},
			});
			return chat;
		} catch (error) {
			throw error;
		}
	},

	update: async (data, chatId) => {
		try {
			const chat = await Prisma.chat.update({
				where: { id: chatId },
				data,
				include: {
					participants: {
						include: {
							user: true,
						},
					},
					admin: true,
				},
			});
			return chat;
		} catch (error) {
			throw error;
		}
	},
	async getAllParticipants(chatId) {
		const existingParticipants = await Prisma.chatParticipants.findMany({
			where: { chatId },
			select: { userId: true },
		});
		return existingParticipants;
	},
	async deleteSelectedParticipants(userIds, chatId) {
		const existingParticipants = await Prisma.chatParticipants.deleteMany({
			where: {
				chatId,
				userId: { in: userIds },
			},
		});
		return null;
	},

	getByUserId: async (userId) => {
		try {
			const chats = await Prisma.chat.findMany({
				where: {
					participants: {
						some: {
							userId,
						},
					},
				},
				select: {
					participants: {
						include: {
							user: true,
						},
					},
					adminId: true,
					id: true,
					name: true,
					avatar: true,
					is_group: true,
					messages: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							text: true,
							created_at: true,
						},
					},
					_count: {
						select: {
							messages: {
								where: {
									senderId: { not: userId },
									readers: { none: { userId: userId } }
								}
							}
						}
					}
				},
			});
			return chats;
		} catch (error) {
			throw error;
		}
	},

	isUserInChat: async (chatId, userId) => {
		try {
			const userInChat = await Prisma.chat.findUnique({
				where: {
					id: chatId,
					participants: {
						some: {
							userId,
						},
					},
				},
			});
			return !!userInChat;
		} catch (error) {
			throw error;
		}
	},
	async getChatByUsers(userId, friendId) {
		try {
			const chat = await Prisma.chat.findFirst({
				where: {
					is_group: false,
					AND: [
						{ participants: { some: { userId: userId } } },
						{ participants: { some: { userId: friendId } } },
					],
				},
				select: {
					id: true,
					name: true,
					avatar: true,
					adminId: true,
					is_group: true,
					participants: {
						select: {
							user: {
								select: {
									username: true,
									id: true,
								},
							},
						},
					},
					messages: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							text: true,
							created_at: true,
						},
					},
					_count: {
						select: {
							messages: {
								where: {
									senderId: { not: userId },
									readers: { none: { userId: userId } }
								}
							}
						}
					}
				},
			});
			return chat;
		} catch (error) {
			throw error;
		}
	},
	async getUserByChatId(userId, chatId) {
		try {
			const chat = await Prisma.chat.findUnique({
				where: {
					id: chatId,
					participants: {
						some: {
							userId: userId,
						},
					},
				},
				select: {
					id: true,
					avatar: true,
					is_group: true,
					name: true,
					adminId: true,
					participants: {
						select: {
							user: {
								select: {
									username: true,
									id: true,
								},
							},
						},
					},
					messages: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							text: true,
							created_at: true,
						},
					},
					_count: {
						select: {
							messages: {
								where: {
									senderId: { not: userId },
									readers: { none: { userId: userId } }
								}
							}
						}
					}
				},
			});
			return chat;
		} catch (error) {
			throw error;
		}
	},
	async deleteChat(userId, chatId) {
		try {
			await Prisma.chatParticipants.deleteMany({ where: { chatId } });
			await Prisma.message.deleteMany({ where: { chatId } });
			const chat = await Prisma.chat.delete({
				where: {
					id: chatId,
					OR: [
						{
							adminId: userId,
						},
						{
							is_group: false,
						},
					],
				},
				select: {
					id: true,
					avatar: true,
					is_group: true,
					name: true,
					adminId: true,
					participants: {
						select: {
							user: {
								select: {
									username: true,
									id: true,
								},
							},
						},
					},
					messages: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							text: true,
							created_at: true,
						},
					},
					_count: {
						select: {
							messages: {
								where: {
									senderId: { not: userId },
									readers: { none: { userId: userId } }
								}
							}
						}
					}
				},
			});
			console.log(chat);
			return chat;
		} catch (error) {
			throw error;
		}
	},
};
