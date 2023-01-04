"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Test = async (req, res) => {
    res.status(200).json({
        message: "Hello world"
    });
};
const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await users_1.default.findOne({ email });
        if (user) {
            return res.status(401).json({
                Error: "User already exist, use a different email and username"
            });
        }
        const userPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await users_1.default.create({
            username,
            email,
            password: userPassword
        });
        const savedUser = await users_1.default.findOne({ email: email });
        return res.status(200).json({
            message: "User Successfully registered",
            savedUser
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Error occurred in the user Register route",
            error
        });
    }
};
const Login = async (req, res) => {
    try {
        console.log("req headers is ", req.headers);
        const { username } = req.body;
        const user = await users_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({
                Error: "Invalid credential"
            });
        }
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                Error: "Invalid credential 2"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, `${process.env.APP_SECRET}`, { expiresIn: "3d" });
        //To omit the password while returning the users details as a response
        const { password, ...others } = user._doc;
        return res.status(200).json({
            message: "You have successfully logged in",
            ...others,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the user login",
            error
        });
    }
};
const updateUser = async (req, res) => {
    try {
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update user route",
            error
        });
    }
};
exports.default = {
    Test,
    Register,
    Login,
    updateUser
};
