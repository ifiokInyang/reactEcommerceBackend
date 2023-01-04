import express, { Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";

dotenv.config()


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
(async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI!, ()=>{
    console.log("Database connected successfully")
})
    } catch (error) {
        console.log(error)
    }
})()

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4545

app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})

export default app;