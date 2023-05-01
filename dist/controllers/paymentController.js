"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const handlePayment = async (req, res) => {
    console.log("req body @handlepayment is ", req.body);
    try {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json({
                    Error: "An error occured in completing your payment",
                    stripeErr,
                });
            }
            else {
                console.log("stripe response is ", { message: stripeRes });
                return res.status(200).json({
                    message: stripeRes,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "An unknwon error ocurred...",
            error,
        });
    }
};
const StripeConfig = async (req, res) => {
    console.log("req body @strpieconfig is ", req.body);
    try {
        return res.status(200).json({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "An unknwon error ocurred...",
            error,
        });
    }
};
const paymentIntent = async (req, res) => {
    console.log("req body @payment intent is ", req.body);
    try {
        const payment_intent = await stripe.paymentIntents.create({
            currency: "eur",
            amount: 1999,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log("payment intent is ", payment_intent);
        console.log("payment_intent.client_secret is ", payment_intent.client_secret);
        return res.status(200).json({
            clientSecret: payment_intent.client_secret,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "An unknwon error ocurred...",
            error,
        });
    }
};
exports.default = {
    handlePayment,
    StripeConfig,
    paymentIntent,
};
