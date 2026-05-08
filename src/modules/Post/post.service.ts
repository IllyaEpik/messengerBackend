import { AppError } from "../../errors/app-errors.ts";
import { PostRepository } from "./post.repository.ts";
import type{ IServiceContract } from "./post.types.ts";

export const PostService: IServiceContract = {
    async create(data, userId,images) {
        console.log(images)
        const post = await PostRepository.create(data,userId, images)
        // if (!post) throw AppError
        return post
    },
    async getByUser(userId) {
        const post = await PostRepository.getByUser(userId)
        // if (!post) throw AppError
        return post
    },
    async get(userId,skip) {
        const posts = await PostRepository.get(userId,skip)
        // if (!posts) throw AppError
        return posts
    },
    async update(id, userId, data, images) {
        const post = await PostRepository.update(id, userId, data, images)
        // if (!post) throw AppError
        return post
    },
    async action(id, userId, action) {
        const post = await PostRepository.action(id, userId, action)
        // if (!post) throw AppError
        return post
    },
    async delete(id, userId) {
        const post = await PostRepository.delete(id, userId)
        // if (!post) throw AppError
        return post
    },
}