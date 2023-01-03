import { Request, Response } from "express";


const Test = async(req: Request, res: Response)=>{
    res.status(200).json({
        message: "Hello world"
    })
}
const Register = async(req: Request, res: Response)=>{
    const {email} = req.body
    return res.status(200).json({
        message: "Successfully received email",
        email
    })
}



export default {
    Test,
    Register
}