import { AppError } from "../../errors/app-errors.ts";
import { PostService } from "./post.service.ts";
import type { IControllerContract } from "./post.types.ts";

export const postController: IControllerContract = {
	async create(req, res, next) {
		try {
			const data = {
				title: req.body.title,
				content: req.body.content,
				...(req.body.topic && { topic: req.body.topic }),
				...(req.body.tags && { tags: req.body.tags.split(" ") }),
				...(req.body.links && { links: req.body.links.split(" ") }),
			};

			const userId = Number(res.locals.userId);
			const files =
				req.files && req.files.length
					? ((req.files as Express.Multer.File[]) || []).map(
							(file) => file.filename,
						)
					: [];

			const post = await PostService.create(data, userId, files);

			res.status(201).json(post);
		} catch (error) {
			next(error);
		}
	},
	async update(req, res, next) {
		try {
			const userId = Number(res.locals.userId);
			const data = req.body;
			const id = Number(req.params.id);
			const files =
				req.files && req.files.length
					? ((req.files as Express.Multer.File[]) || []).map(
							(file) => file.filename,
						)
					: [];
			const post = await PostService.update(id, userId, data, files);

			res.status(200).json(post);
		} catch (error) {
			next(error);
		}
	},
	async get(req, res, next) {
		try {
			const userId = Number(res.locals.userId);
			const skip = Number(req.query.skip) || 0;
			const post = await PostService.get(
				req.query.userId || userId,
				skip,
			);

			res.locals.data = post;
			next();
			// res.status(200).json(post)
		} catch (error) {
			next(error);
		}
	},
	async getByUser(req, res, next) {
		try {
			const userId = Number(res.locals.userId);
			const post = await PostService.getByUser(userId);
			console.log("11111112222222233333", post[0])
			res.locals.data = post;
			next();
			// res.status(200).json(post)
		} catch (error) {
			next(error);
		}
	},
	async action(req, res, next) {
		try {
			const userId = Number(res.locals.userId);
			const data = req.query;
			const id = Number(req.params.id);
			const post = await PostService.action(id, userId, data);

			res.status(200).json(post);
		} catch (error) {
			next(error);
		}
	},
	async delete(req, res, next) {
		try {
			const userId = res.locals.userId;
			const id = Number(req.params.id);
			const post = await PostService.delete(id, userId);

			res.status(204).json({status: "ok"});
		} catch (error) {
			next(error);
		}
	},
};
