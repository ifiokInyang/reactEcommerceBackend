import mongoose from "mongoose";

export interface Category{

}

export interface productAttributes{
    title: string
    desc: string
    img: string
    categories: Category[]
    size: string
    color: string
    price: number
}

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        img: {type: String, required: true},
        categories:{type: Array},
        size:{type: String},
        color:{type: String},
        price:{type: Number, required: true},

    },
    {timestamps: true}
)

const Product = mongoose.model<productAttributes>("Product", ProductSchema)

export default Product