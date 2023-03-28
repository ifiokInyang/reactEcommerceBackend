import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async(req: Request, res: Response)=>{
    try {
        const {username, email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({
                Error: "User already exist, use a different email and username"
            })
        }
        const userPassword = await bcrypt.hash(password, 10);

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
        //This has already been handled in the model with the toJSON property
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
        const { id } = req.params
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body["password"] = hashedPassword
        }
        
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})
    
        return res.status(200).json({
            message: "Successfully updated user details",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update user route", 
            error
        })
    }
}
const deleteUser = async(req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Successfully deleted account",
            user
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in the delete user route", 
            error
        })
    }
}
const getUserById = async(req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)
        return res.status(200).json({
            message: "Successfully fetched user",
            user
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in getting all", 
            error
        })
    }
}
const getAllUsers = async(req: Request, res: Response)=>{
    try{
        //Enabling limit on req.query
        const query = req.query.new
        // const users = query ? await User.find({}).limit(1) : await User.find({})
        //Sorting in descending order
        const users = query ? await User.find({}).sort({_id: 1}).limit(2) : await User.find({})

        return res.status(200).json({
            message: "Successfully fetched all users",
            users
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in getting all", 
            error
        })
    }
}
const getUserStats = async(req: Request, res: Response)=>{
    try{
        
        //Returns the current date in string, including, year, month, day, and time,
        const date = new Date()
        //Returns date in number since 1970, you can perform mathematical operation on this date
        // const numberDate = Date.now()
        //Getting last year's date 
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        //We use $match to check the year, then project to get the particular month
        const data =  await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project:{
                month: {
                    $month: "$createdAt"
                },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            }
        }
        ])

        return res.status(200).json({
            message: "Successfully fetched all users",
            data
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in getting user stats", 
            error
        })
    }
}

export default {
    Register,
    Login,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserStats
}