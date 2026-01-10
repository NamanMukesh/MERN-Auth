import express from "express"
import { Login, logout, Register, sendVerifyOtp, verifyEmail } from "../Controllers/Auth.controllers.js";
import userAuth from "../Middleware/Auth.middleware.js";

const authRoute = express.Router();

authRoute.post('/register', Register)
authRoute.post('/login', Login)
authRoute.post('/logout', logout)
authRoute.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRoute.post('/verify-account', userAuth, verifyEmail)

export default authRoute;