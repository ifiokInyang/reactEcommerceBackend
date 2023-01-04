"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../models/cart"));
const createCart = async (req, res) => {
    try {
        const { products } = req.body;
        const cartProduct = await cart_1.default.create({
            products
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
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = await cart_1.default.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json({
            message: "Successfully updated cart details",
            updatedCart
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update cart route",
            error
        });
    }
};
//DELETING AN ITEM IN THE CART
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartProduct = await cart_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Successfully deleted cartProduct",
            cartProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in the delete cartProduct route",
            error
        });
    }
};
//GET ALL CART PRODUCTS - no need for query, so that the user can view all his cart items and check out
const getAllCartProducts = async (req, res) => {
    try {
        const cartProducts = await cart_1.default.find({});
        return res.status(200).json({
            message: "Successfully fetched all cart products",
            cartProducts,
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in getting all cart products",
            error
        });
    }
};
//GET CART PRODUCT BY ID
const getCartProductsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartProduct = await cart_1.default.findOne({ userId });
        return res.status(200).json({
            message: "Successfully fetched cartProduct",
            cartProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An error occured in getting a cart product",
            error
        });
    }
};
exports.default = {
    createCart,
    updateCart,
    deleteCart,
    getAllCartProducts,
    getCartProductsByUserId
};
