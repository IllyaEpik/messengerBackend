
// import { IServiceContract, IToken } from "./user.types.ts"
import { env } from "../../config/env.ts";
import jwt from "jsonwebtoken";
import type { IServiceContract } from "./user.types.ts"
import { UserRepository } from "./user.repository.ts";

// interface IServiceContract {
//     registation: (user:UserCreate) => Promise<string | IToken>
//     login: (userData:UserLogin) => Promise<string | IToken>
//     me: (id:number) => Promise<UserSecurity | string>
// }

export const UserService:IServiceContract = {
    registation: async (user) => {
            const createdUser = await UserRepository.createUser(user)
            
            if (!createdUser) return "Failed to create user"
            
            const token = jwt.sign({ userId: createdUser.id }, env.SECRET_KEY, { expiresIn: "7d" })
            return { token }
    },

    login: async (userData) => {
            const user = await UserRepository.getUser(userData.email)
            if (!user || user.password !== userData.password) {
                return "Invalid email or password"
            }
            const token = jwt.sign({ userId: user.id }, env.SECRET_KEY, { expiresIn: "7d" })
            return { token }
    },

    me: async (id) => {
        const user = await UserRepository.getUserById(id)
        if (!user) return "User not found"
        return user
    }
}