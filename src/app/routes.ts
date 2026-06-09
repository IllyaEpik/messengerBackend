import userRouter from "../modules/User/user.router.ts";
import albumsRouter from "../modules/Albums/album.router.ts";
import postRouter from "../modules/Post/post.router.ts";
import chatRouter from "../modules/Chat/chat.router.ts";
import messageRouter from "../modules/Messages/message.router.ts";
import { Router } from "express";

export const AppRouter = Router();

AppRouter.use("/users/", userRouter);

AppRouter.use("/albums/", albumsRouter);
AppRouter.use("/posts/", postRouter);
AppRouter.use("/chats/", chatRouter);
AppRouter.use("/messages/", messageRouter);
