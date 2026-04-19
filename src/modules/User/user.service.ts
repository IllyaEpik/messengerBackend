
// import { IServiceContract, IToken } from "./user.types.ts"
import { env } from "../../config/env.ts";
import jwt from "jsonwebtoken";
import type { IServiceContract } from "./user.types.ts"
import { UserRepository } from "./user.repository.ts";
import { transporter } from "../../config/sender.ts";
import { randomInt } from "crypto";
import sharp from 'sharp';
import { join,dirname  } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = join(__dirname, "../../media/")

export const UserService:IServiceContract = {
    registation: async (user) => {
        let createdUser = await UserRepository.createUser(user)
        if (!createdUser) {
            const gottenUser = await UserRepository.getUser(user.email)
            if (!gottenUser){
                return "Failed to create user|422"
            }
            if (!gottenUser.confirmedUser){
                return "user with this email already exists|403"
            }
            await UserRepository.deleteCodeByUserId(gottenUser.id)
            createdUser = gottenUser
        }
        const confirmationCode = randomInt(999999);
        
        await UserRepository.createCode(createdUser.id, confirmationCode)
        await transporter.sendMail({
            from: '"messenger" <illyaepik@gmail.com>',
            to: user.email,
            subject: "get confirmation code",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h1>hello!</h1>
                    <p>code is ${confirmationCode}</p>
                    
                </div>
            `})
        return "success|200"
    },
    secondPhaseOfRegistation: async (code) => {
        const userId = await UserRepository.getCode(code)
        if (userId == null) {
            return "Invalid confirmation code|404"
        }
        
        await UserRepository.deleteCodeByUserId(userId)
        await UserRepository.confirmUserById(userId)
        const token = jwt.sign({ userId }, env.SECRET_KEY, { expiresIn: "7d" })
        return { token }
    },
    login: async (userData) => {
        const user = await UserRepository.getUser(userData.email)
        if (!user || user.password !== userData.password) {
            console.log("Invalid email or password")
            return "Invalid email or password|404"
        }
        if (!user.confirmedUser) {
            console.log("not confirmed")
            return "Please confirm your email before logging in|403"
        }
        const token = jwt.sign({ userId: user.id }, env.SECRET_KEY, { expiresIn: "7d" })
        return { token }
    },

    me: async (id) => {
        const user = await UserRepository.getUserById(id)
        if (!user) return "User not found|404"
        return user
    },
    updateUser: async (id,data,avatar) => {
        
        const user = await UserRepository.updateUser(id,data)
        if (!user) return "User not found|404"
        if (!avatar){
            return user
        }

        const timestamp = Date.now();
        const originalPath = join(outputDir, `/Avatars/${timestamp}.jpg`);
        const minimizedPath = join(outputDir, `/crackedAvatars/${timestamp}.jpg`);
        await sharp(avatar.buffer).toFile(originalPath);
        console.log(`Original saved to: ${originalPath}`);

        await sharp(avatar.buffer)
        .resize({ width: 50, withoutEnlargement: true }) 
        .jpeg({ quality: 80 })  
        .toFile(minimizedPath);
        console.log(`Minimized saved to: ${minimizedPath}`);
        await UserRepository.avatar(id,{
            avatar:originalPath,
            crackedAvatar:minimizedPath
        })
        return user
    },
    createProfile: async (id, data) => {
        const user = await UserRepository.createProfile(id,data)
        if (!user) return "User not found|404"
        
        return user
    }
    // resetPassword: async (email) => {
        
    //     const confirmationToken = randomInt(999999);
    //     const confirmUrl = `http://127.0.0.1:3000/confirm-password-change/${confirmationToken}`;
    //     const user = await UserRepository.getUser(email)
    //     if (!user) return "wrong email|404"
    //     try {
    //         await UserRepository.deleteTokenByUserId(user.id)
    //     } catch (error) {
    //         console.log()
    //     }   
    //     await UserRepository.createToken(user.id,confirmationToken)
    //     await transporter.sendMail({
    //         from: '"dronesShop" <illyaepik@gmail.com>',
    //         to: email,
    //         subject: "confirm reset password",
    //         html: `
    //             <div style="font-family: Arial, sans-serif; text-align: center;">
    //                 <h1>hello!</h1>
    //                 <p>Click on this link to confirm:</p>
    //                 <a href="${confirmUrl}"
    //                     style="background-color: #4CAF50; 
    //                             color: white; 
    //                             padding: 14px 25px; 
    //                             text-decoration: none; 
    //                             display: inline-block; 
    //                             border-radius: 4px;
    //                             font-weight: bold;">
    //                     confirm reset password
    //                 </a>
    //             </div>
    //         `})
    //     return "succses |200"
    // }
}