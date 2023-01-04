import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const Test = async(req: Request, res: Response)=>{
    res.status(200).json({
        message: "Hello world"
    })
}
const Register = async(req: Request, res: Response)=>{
    try {
        const {username, email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({
                Error: "User already exist, use a different email and username"
            })
        }
        const userPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create(    
            {
                username,
                email,
                password:userPassword
            }
        )
        const savedUser = await User.findOne({email:email})

        return res.status(200).json({
            message: "User Successfully registered",
            savedUser
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Error occurred in the user Register route",
            error
        })
    }
    
}

const Login = async(req: Request, res: Response)=>{
    try{
        console.log("req headers is ", req.headers)
        const { username} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                Error: "Invalid credential"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.status(400).json({
                Error: "Invalid credential 2"
            })
        }
        const token = jwt.sign({id:user._id, email:user.email, isAdmin: user.isAdmin}, 
            `${process.env.APP_SECRET}`, {expiresIn: "3d"})
        //To omit the password while returning the users details as a response
        const { password, ...others} = user._doc
        return res.status(200).json({
            message: "You have successfully logged in",
            ...others,
            token
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in the user login", 
            error
        })
    }

}
const updateUser = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update user route", 
            error
        })
    }
}

export default {
    Test,
    Register,
    Login,
    updateUser
}