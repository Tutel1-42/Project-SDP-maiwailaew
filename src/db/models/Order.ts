import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', 
            required: true,
        },
        artToy: { 
            type: mongoose.Schema.ObjectId,
            ref: 'Toy', 
            required: true,
        },
        orderAmount: { 
            type: Number,
            required: true,
            min: [1, "Order amount must be at least 1"],
            max: [5, "Order amount cannot exceed 5"],
        },
    },
    {
        timestamps: true, 
        collection: 'orders' 
    }
);

const Order = mongoose.models.Order || mongoose.model("Order",OrderSchema)

export default Order;