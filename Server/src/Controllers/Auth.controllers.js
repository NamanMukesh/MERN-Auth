import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../Models/User.Models.js"
import transporter from "../Config/Nodemailer.config.js"


//Register
const Register = async(req, res) => {
    const {name, email, password} = req.body

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return res
        .status(400)
        .json({success: false, message: "All fields are required"})
    }

    try {
        const existingUser = await User.findOne({email: email.toLowerCase()})

        if (existingUser) {
            return res
            .status(409)
            .json({success: false, message: "User already Exists"})
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = await User.create(
            {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: hashpassword
            }
        )

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        //Sending welcome mail
        const mailOptions = {
            from: `"MERN-Auth" <${process.env.SENDER_MAIL}>`,
            to: user.email,
            subject: 'Welcome to MERN-Auth',
            text: `Welcome to Mern-Auth Authentication. Your account has been created with email id: ${email}`
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            console.error("Email failed:", mailErr.message);
        }

        return res
        .status(201)
        .json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "User Registered Successfully" 
        });

        
    } catch (error) {
        return res
        .status(500)
        .json({success: false, message: error.message})
    }
}

//Login
const Login = async(req, res) => {
    const {email, password} = req.body

    if (!email?.trim() || !password?.trim()) {
        return res
        .status(400)
        .json({success: false, message: "All fields required"})
    }

    try {
        
        const user = await User.findOne(
            {
                email: email.trim().toLowerCase()
            }
        )

        if (!user) {
            return res
            .status(401)
            .json({success: false, message: "Invalid Email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
            .status(401)
            .json({success: false, message: "Invalid Password"})
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        return res
        .status(200)
        .json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
            },
            message: "User Logged In Successfully" 
        })

    } catch (error) {
        return res
        .status(500)
        .json({success: false, message: error.message})
    }
}

//Logout
const logout = async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res
        .status(200)
        .json({success: true, message: "Logged Out Successfully"})

    } catch (error) {
        return res
        .status(500)
        .json({success: false, message: error.message})
    }
}

export {
    Register,
    Login,
    logout
}