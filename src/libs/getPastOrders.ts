import { dbConnect } from "@/db/dbConnect";
import Order from "@/db/models/Order";
import { Types } from "mongoose";

export async function getPastOrderedToyIds(userId: string): Promise<string[]> {
    try {
        await dbConnect();

        const userOrders = await Order.find({ 
            user: new Types.ObjectId(userId),
            // เรายังคง query นี้ไว้ เพื่อประสิทธิภาพที่ดี
            artToy: { $exists: true, $ne: null } 
        }).select("artToy");

        if (!userOrders || userOrders.length === 0) {
            return []; 
        }

        const toyIds = userOrders
            .map(order => order.artToy)     
            .filter(Boolean)                
            .map(artToy => artToy.toString()); 

        return Array.from(new Set(toyIds));
    } catch (error) {
        console.error("Failed to fetch past orders:", error);
        return [];
    }
}