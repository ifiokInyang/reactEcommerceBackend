"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
// declare global{
//     namespace Express{
//         interface Request{
//             user?: userAttributes
//         }
//     }
// }
const verifyToken = async (req, res, next) => {
    // let token?: string;
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                Error: "unauthorized"
            });
        }
        const verified = await jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
        if (!verified) {
            return res.status(403).json({
                Error: "Invalid token"
            });
        }
        const user = await users_1.default.findOne({ _id: verified.id });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error ocured in authorization",
            error
        });
    }
};
const verifyAndAuthorize = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({
                Error: "You are not allowed to do that"
            });
        }
    });
};
const verifyAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({
                Error: "You are not allowed to perform this operation"
            });
        }
    });
};
exports.default = {
    verifyToken,
    verifyAndAuthorize,
    verifyAndAdmin
};
