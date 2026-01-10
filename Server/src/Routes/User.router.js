import express from "express";
import userAuth from "../Middleware/Auth.middleware";
import { getAllUsers } from "../Controllers/User.controllers";

const userRouter = express.Router()

userRouter.get('/data',userAuth, getAllUsers)

export default userRouter;