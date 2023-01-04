import { Request, Response } from "express";
import Product from "../models/products";



const createProduct = async(req: Request, res: Response) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body
        const product = await Product.create({
            title, desc, img, categories, size, color, price
        })
        return res.status(200).json({
            message: "Successfully created this product",
            product

        })
    } catch (error) {
        return res.status(500).json({
            Error: "An error ocurred in the create product route",
            error
        })
    }
}

const updateProduct = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})

        return res.status(200).json({
            message: "Successfully updated product details",
            updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            Error: "An error occured in the update product route", 
            error
        })
    }
}
const deleteProduct = async (req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Successfully deleted product",
            product
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in the delete product route", 
            error
        })
    }
}
const getAllProducts = async(req: Request, res: Response)=>{
    try{
        let products;
        //Enabling limit on req.query
        const queryNew = req.query.new
        const queryCategory = req.query.category
        // const users = query ? await User.find({}).limit(1) : await User.find({})
        //Sorting in descending order
        if(queryNew){
            products = await Product.find({}).sort({createdAt: 1}).limit(2)
        }
        //meaning if the category in the query params is contained in the category
        else if(queryCategory){
            products = await Product.find({
                categories:{
                    $in: [queryCategory],
                }
            })
            //a fall back to find all products
        }else{
            products = await Product.find({})
        }

        return res.status(200).json({
            message: "Successfully fetched all products",
            products,
        
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in getting all", 
            error
        })
    }
}
const getProductById = async(req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const product = await Product.findById(id)
        return res.status(200).json({
            message: "Successfully fetched product",
            product
        })
    } catch(error){
        return res.status(500).json({
            Error: "An error occured in getting a single product", 
            error
        })
    }
}

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}