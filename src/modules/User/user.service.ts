// import { IServiceContract, IToken } from "./user.types.ts"
import { env } from "../../config/env.ts";
import jwt from "jsonwebtoken";
import type { IServiceContract } from "./types/user.contract.ts";
import { UserRepository } from "./user.repository.ts";
import sharp from "sharp";

import { compare, hash } from "bcryptjs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { albumRepository } from "../Albums/album.repository.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = join(__dirname, "../../media/");

export const UserService: IServiceContract = {
	registation: async (user) => {
		let createdUser = await UserRepository.createUser({
			email: user.email,
			password: await hash(user.password, 10),
		});
		// console.log(createdUser)
		if (!createdUser) {
			const gottenUser = await UserRepository.getUser(user.email);
			// console.log(gottenUser)
			if (!gottenUser) {
				return "Failed to create user|422";
			}
			//if (!gottenUser.confirmedUser){
			// return "user with this email already exists|403"
			//}
			// await UserRepository.deleteCodeByUserId(gottenUser.id)
			createdUser = gottenUser;
		}
		// const confirmationCode = randomInt(999999);

		// await UserRepository.createCode(createdUser.id, confirmationCode, new Date(Date.now() + 300000))
		// await transporter.sendMail({
		//     from: '"messenger" <illyaepik@gmail.com>',
		//     to: user.email,
		//     subject: "get confirmation code",
		//     html: `
		//         <div style="font-family: Arial, sans-serif; text-align: center;">
		//             <h1>hello!</h1>
		//             <p>code is ${confirmationCode}</p>

		//         </div>
		//     `})
		return "success|200";
	},
	secondPhaseOfRegistation: async (code) => {
		const userId = await UserRepository.getCode(code);
		if (userId == null) {
			return "Invalid confirmation code|404";
		}

		await UserRepository.deleteCodeByUserId(userId);
		// await UserRepository.confirmUserById(userId)
		const token = jwt.sign({ userId }, env.SECRET_KEY, { expiresIn: "7d" });

		return { token };
	},
	login: async (userData) => {
		console.log("hwmm", "qeewqqwewq");
		const user = await UserRepository.getUser(userData.email);
		console.log("www", "qeewqqwewq");
		if (!user || !(await compare(userData.password, user.password))) {
			return "Invalid email or password|404";
		}
		//if (!user.confirmedUser) {
		//   return "Please confirm your email before logging in|403"
		//}
		// console.log("dsadasads", { userId: user.id }, env.SECRET_KEY, { expiresIn: "7d" })
		const token = jwt.sign({ userId: Number(user.id) }, env.SECRET_KEY, {
			expiresIn: "7d",
		});
		console.log(token, "qeewqqwewq");
		return { token };
	},

	me: async (id) => {
		const user = await UserRepository.getUserById(BigInt(id));
		if (!user) return "User not found|404";
		return user;
	},
	updateUser: async (id, data, files) => {
		const timestamp = Date.now();

		const user = await UserRepository.updateUser(BigInt(id), {
			...(data?.username && { username: data?.username }),
			...(data?.email && { email: data?.email }),
			...(data?.firstName && { first_name: data?.firstName }),
			...(data?.lastName && { last_name: data?.lastName }),
		});
		const profile = await UserRepository.updateProfile(BigInt(id), {
			...(data?.pseudonym && { pseudonym: data?.pseudonym }),
			...(data?.birthDate && { birth_date: new Date(data?.birthDate) }),
			...(data?.isTextSignature && {
				is_text_signature: data?.isTextSignature === "true",
			}),
			...(data?.isImageSignature && {
				is_image_signature: data?.isImageSignature === "true",
			}),
			...(files?.signature && { signature: files.signature }),
			...(files?.avatar && { avatar: files.avatar }),
		});
		if (!user || !profile) return "User not found|404";
		if (!files?.avatar && !files?.signature) {
			return profile;
		}

		// const originalPath = join(outputDir, `/Avatars/${timestamp}.jpg`);
		// const minimizedPath = join(
		// 	outputDir,
		// 	`/crackedAvatars/${timestamp}.jpg`,
		// );
		// if (files?.avatar && files.avatar.length > 0) {
		// 	const avatar = files.avatar.at(0) as Express.Multer.File;
		// 	await sharp(avatar.buffer).toFile(originalPath);

		// 	await sharp(avatar.buffer)
		// 		.resize({ width: 100, withoutEnlargement: true })
		// 		.jpeg({ quality: 80 })
		// 		.toFile(minimizedPath);
		// }
		// if (
		// 	!files?.signature ||
		// 	files.signature.length < 1
		// ) {
		// 	return user;
		// }
		// const electronicSignature = files.signature.at(
		// 	0,
		// ) as Express.Multer.File;
		// await sharp(electronicSignature.buffer).toFile(originalPath);

		// await sharp(electronicSignature.buffer)
		// 	.resize({ width: 100, withoutEnlargement: true })
		// 	.flatten({ background: { r: 255, g: 255, b: 255 } })
		// 	.jpeg({ quality: 80 })
		// 	.toFile(minimizedPath);

		return profile;
	},
	createProfile: async (id, data) => {
		const user = await UserRepository.createProfile(BigInt(id), data);
		if (!user) return "User not found|404";
		const date = new Date();
		await albumRepository.createAlbum(
			{
				year: date.getFullYear(),
				title: "avatars",
				topic: "avatars",
			},
			user.id,
		);
		return user;
	},

	sendFriendRequest: async (fromUserId, toUserId) => {
		if (fromUserId === toUserId)
			return "You cannot send a friend request to yourself|400";
		await UserRepository.sendFriendRequest(
			BigInt(fromUserId),
			BigInt(toUserId),
		);
	},
	confirmFriendRequest: async (fromUserId, toUserId) => {
		await UserRepository.confirmFriendRequest(
			BigInt(fromUserId),
			BigInt(toUserId),
		);
	},
	getFriends: async (userId, pagination) => {
		const friends = await UserRepository.getFriends(
			BigInt(userId),
			pagination,
		);
		const friendRequests = await UserRepository.getFriendRequests(
			BigInt(userId),
		);
		const exceptions = friends
			.concat(friendRequests)
			.map((friend) => friend.userId)
			.filter((id) => id !== null);
		const friendsRecommneds = await UserRepository.getRecommendedFriends(
			BigInt(userId),
			exceptions,
		);
		return {
			friends,
			friendRequests,
			friendsRecommneds,
		};
	},
	deleteFriend: async (userId, friendId) => {
		await UserRepository.deleteFriend(BigInt(userId), BigInt(friendId));
	},
	removeRecommendations: async (userId, friendId) => {
		await UserRepository.removeRecommendations(
			BigInt(userId),
			BigInt(friendId),
		);
	},
	async getfriendById(userId) {
		const user = await UserRepository.getfriendById(BigInt(userId));
		if (!user || !user.profile)
			throw new Error(`wrong user, ${!user} ${!user?.profile}`);
		return {
			readers: user.posts.reduce(
				(sum, item) => sum + item._count.views,
				0,
			),
			frieds: user._count.receivedRequests + user._count.sentRequests,
			posts: user._count.posts,
			username: user.username || "noname",

			pseudonym: user.profile.pseudonym ?? "Anonymous",
			avatar: user.profile.avatar ?? "",

			albums: user.profile.albums.map((album) => ({
				photos: album.albumImage.map((photo) => photo.image),
				theme: album.theme ?? "",
				name: album.name,
				year: album.year ?? 2026,
			})),
		};
	},
	async getAllUsers() {
		const users = await UserRepository.getAllUsers();
		return users;
	},
};
