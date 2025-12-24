import mongoose, { Schema } from "mongoose";

const userScheme = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    verifyOTP: {
        type: Number,
        default: '',
    },
    verifyOTPExpireAt: {
        type: String,
        default: 0,
    },
    resetOTP: {
        type: Number,
        default: '',
    },
    resetOTPExpireAt: {
        type: String,
        default: 0,
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    }
})

export const User = mongoose.model("User", userScheme);