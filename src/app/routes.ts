import userRouter from "../modules/User/user.router.ts";
import { Router } from "express";

export const AppRouter = Router();


AppRouter.use("/users/", userRouter);

// 123@132132132 1234567890