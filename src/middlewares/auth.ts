import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { userAttributes } from "../models/users";


export interface JwtPayload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}

// export interface Jwt {
//     header: JwtHeader;
//     payload: JwtPayload | string;
//     signature: string;
// }

export interface AuthUser{
        id: string,
        email: string,
        isAdmin: boolean,
        exp: number
}
// declare global{
//     namespace Express{
//         interface Request{
//             user?: userAttributes
//         }
//     }
// }

const verifyToken = async(req: JwtPayload, res: Response, next: NextFunction) => {
    // let token?: string;
    try{
        let token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({
                Error: "unauthorized"})
        }
        const verified = await jwt.verify(token, `${process.env.APP_SECRET}`) as AuthUser
        if(!verified){
            return res.status(403).json({
                Error: "Invalid token"})
        }
        const user = await User.findOne({_id:verified.id})
        req.user = user
        console.log("req.user is ", req.user)
        next()
    }catch(error){
        return res.status(500).json({
            Error: "An error ocured in authorization",
            error
        })
    }
}

const verifyAndAuthorize = async(req: JwtPayload, res: Response, next: NextFunction)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json({
                Error: "You are not allowed to do that"
            })
        }
      
    })
}

export default {
    verifyToken,
    verifyAndAuthorize
}