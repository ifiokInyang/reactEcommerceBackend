import mongoose from "mongoose";


export interface ProductArray{
    productId: string
    quantity: number
}
export interface cartAttributes{
    userId: string
    products: ProductArray[]
}

const CartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true},
        products: [
            {
                productId:{
                    type: String
                },
                quantity:{
                    type: Number,
                    default: 1
                }
            }
        ],
        

    },
    {timestamps: true}
)

const Cart = mongoose.model<cartAttributes>("Cart", CartSchema)

export default Cart