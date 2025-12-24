import express from "express"
import { Login, logout, Register } from "../Controllers/Auth.controllers.js";

const authRoute = express.Router();

authRoute.post('/register', Register)
authRoute.post('/login', Login)
authRoute.post('/logout', logout)

export default authRoute;