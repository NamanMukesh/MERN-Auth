import express from "express"
import { isAuthenticated, Login, logout, Register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../Controllers/Auth.controllers.js";
import userAuth from "../Middleware/Auth.middleware.js";

const authRoute = express.Router();

authRoute.post('/register', Register)
authRoute.post('/login', Login)
authRoute.post('/logout', logout)
authRoute.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRoute.post('/verify-account', userAuth, verifyEmail)
authRoute.post('/is-authenticated', userAuth, isAuthenticated)
authRoute.post('/send-reset-otp', sendResetOtp)
authRoute.post('/reset-password', resetPassword)

export default authRoute;