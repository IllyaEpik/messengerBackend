import { env } from "../../config/env.ts";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service.ts";
import type { IControllerContract } from "./types/user.contract.ts";
import type { updateProfileFile } from "./types/user.types.ts";

export const UserController: IControllerContract = {
	registation: async (req, res, next) => {
		try {
			const user = req.body;
			const result = await UserService.registation(user);
			res.locals.data = result;
			res.locals.succsesStatus = 201;
			next();
		} catch (error) {
			// console
			res.status(500).json({ error });
		}
	},
	RegistrationSecondPhase: async (req, res, next) => {
		// console.log(req.params.code,"ewqwqwq")
		try {
			const code = Number(req.params.code);
			const result = await UserService.secondPhaseOfRegistation(code);
			res.locals.data = result;
			// console.log(result)
			res.locals.succsesStatus = 201;
			next();
		} catch (error) {
			res.status(500).json({ error });
		}
	},

	login: async (req, res, next) => {
		try {
			const userData = req.body;
			const result = await UserService.login(userData);
			// console.log(userData, result)
			res.locals.data = result;
			// console.log(result)
			next();
		} catch (error) {
			res.status(500).json({ error });
		}
	},
	me: async (req, res, next) => {
		try {
			const userId = Number(res.locals.userId);
			const result = await UserService.me(userId);

			res.locals.data = result;
			next();
		} catch (error) {
			console.error("Error in me controller:", error);
			res.status(500).json({ error });
		}
	},
	updateUser: async (req, res, next) => {
		try {
			const userUpdateData = req.body;
			const userId = res.locals.userId;
			// console.log(userUpdateData)
			const files = req.files as updateProfileFile;

			const result = await UserService.updateUser(
				userId,
				userUpdateData,
				files,
			);
			// console.log(result)
			res.locals.data = result;

			next();
		} catch (error) {
			console.error("Error in me controller:", error);
			res.status(500).json({ error });
		}
	},
	createProfile: async (req, res, next) => {
		try {
			const profileCreateData = req.body;

			const userId = Number(res.locals.userId);
			// console.log(req.body, userId, profileCreateData)
			const result = await UserService.createProfile(userId, profileCreateData);
			res.locals.data = result;
			next();
		} catch (error) {
			console.error("Error in me controller:", error);
			res.status(500).json({ error });
		}
	},
	sendFriendRequest: async (req, res, next) => {
		try {
			// console.log("send friend request", req.params.profile, res.locals.userId)
			const fromUserId = Number(res.locals.userId);
			const toUserId = Number(req.params.profile);
			const response = await UserService.sendFriendRequest(
				fromUserId,
				toUserId,
			);
			res.locals.data = response || "Friend request sent|200";
			next();
		} catch (error) {
			console.error("Error in sendFriendRequest controller:", error);
			res.status(500).json({ error });
		}
	},
	confirmFriendRequest: async (req, res, next) => {
		try {
			// console.log("confirming friend request", req.params.fromUserId, res.locals.userId)
			const toUserId = Number(res.locals.userId);
			const fromUserId = Number(req.params.fromUserId);
			await UserService.confirmFriendRequest(fromUserId, toUserId);
			res.locals.data = "Friend request confirmed|200";
			next();
		} catch (error) {
			console.error("Error in confirmFriendRequest controller:", error);
			res.status(500).json({ error });
		}
	},
	getFriends: async (req, res, next) => {
		try {
			const userId = Number(res.locals.userId);
			// const pagination = req.query
			// const { recommends, requests } = req.query
			const result = await UserService.getFriends(userId, req.query);
			res.locals.data = result;
			next();
		} catch (error) {
			console.error("Error in getFriends controller:", error);
			res.status(500).json({ error });
		}
	},
	deleteFriend: async (req, res, next) => {
		try {
			// console.log("deleting friend", req.params.friendId, res.locals.userId)
			const userId = Number(res.locals.userId);
			const friendId = Number(req.params.friendId);
			await UserService.deleteFriend(userId, friendId);
			res.locals.data = "Friend deleted";
			next();
		} catch (error) {
			console.error("Error in deleteFriend controller:", error);
			res.status(500).json({ error });
		}
	},
	removeRecommendations: async (req, res, next) => {
		try {
			// console.log("removing friend request", req.params.friendId, res.locals.userId)
			const userId = Number(res.locals.userId);
			const friendId = Number(req.params.friendId);
			await UserService.removeRecommendations(userId, friendId);
			res.locals.data = "Friend request removed";
			res.locals.status = 204;
			next();
		} catch (error) {
			console.error("Error in removeFriendRequest controller:", error);
			res.status(500).json({ error });
		}
	},
	async getfriendById(req, res, next) {
		const userId = Number(req.params.userId);
		const user = await UserService.getfriendById(userId);
		res.locals.data = user;
		next();
	},
	async getAllUsers(req, res, next) {
		const users = await UserService.getAllUsers();
		res.locals.data = users;
		next();
	},
};
