// const express = require/("express")
import express from "express";
import { UserController } from "./user.controller.ts";
// import  from "./users.controller";
// const controllerData = require("./users.controller")
// import controllerData from "./user.controller.ts";
// import authMiddleware from "../middlewares/auth-Middleware.ts";

const router = express.Router()
router.post("/registration", UserController.registation)
router.post("/login", UserController.login)
router.get("/me", UserController.me)

export default router
//     "name":"ok",