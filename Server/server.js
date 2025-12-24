import express from "express";
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser";
import connectDB from "./src/Config/Db.config.js"
import authRoute from "./src/Routes/Auth.routes.js";

const app = express();
const port = process.env.PORT || 4000
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true}))

//API Endpoints
app.get("/", (req, res)=> res.send("API Working Properly"))
app.use('/api/auth', authRoute)

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));