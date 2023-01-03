import mongoose from "mongoose";


export interface ProductArray{
    productId: string
    quantity: number
}
export interface orderAttributes{
    userId: string,
    products: ProductArray[],
    amount: number,
    address: {},
    status: string
}

const OrderSchema = new mongoose.Schema(
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
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: "pending"}

    },
    {timestamps: true}
)

const Order = mongoose.model<orderAttributes>("Order", OrderSchema)

export default Order