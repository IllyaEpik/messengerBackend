import userRouter from "../modules/User/user.router.ts";
import { Router } from "express";

export const AppRouter = Router();


AppRouter.use("/users/", userRouter);