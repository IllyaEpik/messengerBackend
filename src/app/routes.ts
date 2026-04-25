import userRouter from "../modules/User/user.router.ts";
import albumsRouter from "../modules/Albums/album.router.ts";
import { Router } from "express";

export const AppRouter = Router();


AppRouter.use("/users/", userRouter);

AppRouter.use("/albums/", albumsRouter);