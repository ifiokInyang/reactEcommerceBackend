"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/order"));
const createOrder = async (req, res) => {
    try {
        const { products, amount, address, status } = req.body;
        const cartProduct = await order_1.default.create({
            products, amount, address, status
        });
        return res.status(200).json({
            message: "Successfully created this Product",
            cartProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error ocurred in the create cart route",
            error
        });
    }
};
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await order_1.default.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json({
            message: "Successfully updated order details",
            updatedOrder
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update order route",
            error
        });
    }
};
//DELETING AN ORDER
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await order_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Successfully deleted order",
            order
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the delete orders route",
            error
        });
    }
};
//GET USER ORDERS
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await order_1.default.find({ userId });
        return res.status(200).json({
            message: "Successfully fetched user orders",
            orders
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in getting user orders",
            error
        });
    }
};
//GET ALL CART PRODUCTS - no need for query, so that the user can view all his cart items and check out
const getAllOrders = async (req, res) => {
    try {
        const orders = await order_1.default.find({});
        return res.status(200).json({
            message: "Successfully fetched all cart products",
            orders,
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in getting all cart products",
            error
        });
    }
};
//GET MONTHLY INCOME
const getMonthlyStats = async (req, res) => {
    try {
        //Returns the current date in string, including, year, month, day, and time,
        const date = new Date();
        //Returns date in number since 1970, you can perform mathematical operation on this date
        // const numberDate = Date.now()
        //Getting last month's date 
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        //To get the month before last month
        const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
        //We use $match to check the year, then project to get the particular month
        const income = await order_1.default.aggregate();
        return res.status(200).json({
            message: "Successfully fetched all users",
            income
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in getting monthly stats",
            error
        });
    }
};
exports.default = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    getMonthlyStats
};
