import { AppError } from "../../errors/app-errors.ts";
import { PostRepository } from "./post.repository.ts";
import type{ IServiceContract } from "./post.types.ts";

export const PostService: IServiceContract = {
    async create(data, userId,images) {
        const post = await PostRepository.create(data,BigInt(userId), images)
        // if (!post) throw AppError
        return post
    },
    async getByUser(userId) {
        const post = await PostRepository.getByUser(BigInt(userId))
        // if (!post) throw AppError
        return post
    },
    async get(userId,skip) {
        const posts = await PostRepository.get(BigInt(userId),skip)
        // if (!posts) throw AppError
        return posts
    },
    async update(id, userId, data, images) {
        const post = await PostRepository.update(BigInt(id), BigInt(userId), data, images)
        // if (!post) throw AppError
        return post
    },
    async action(id, userId, action) {
        const post = await PostRepository.action(BigInt(id), BigInt(userId), action)
        // if (!post) throw AppError
        return post
    },
    async delete(id, userId) {
        const post = await PostRepository.delete(BigInt(id), BigInt(userId))
        // if (!post) throw AppError
        return post
    },
}