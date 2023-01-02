import express, { Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(logger("dev"))

app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "Hello world"
    })
})

const PORT = process.env.PORT || 4545

app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})

export default app;