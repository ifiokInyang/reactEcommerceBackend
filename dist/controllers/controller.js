"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test = async (req, res) => {
    res.status(200).json({
        message: "Hello world"
    });
};
exports.default = {
    Test
};
