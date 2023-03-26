import express, { Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import orderRoutes from "./routes/orderRoute";
import paymentRoutes from "./routes/stripe"


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
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/checkout", paymentRoutes)

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "api is running"
    })
})

const PORT = process.env.PORT || 4545

app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})

export default app;