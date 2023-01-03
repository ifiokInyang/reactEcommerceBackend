"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test = async (req, res) => {
    res.status(200).json({
        message: "Hello world"
    });
};
const Register = async (req, res) => {
    const { email } = req.body;
    return res.status(200).json({
        message: "Successfully received email",
        email
    });
};
exports.default = {
    Test,
    Register
};
