"use server"
import { dbConnect } from "@/db/dbConnect";
import Order from "@/db/models/Order";
import { CartItem } from "@/redux/features/cartSlice"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { revalidatePath } from "next/cache";

export async function createOrders(toyItems: CartItem[]) {
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
        throw new Error("User is not authenticated");
    }

    if (session.user.role !== 'member') {
        // non-member can't order
        console.error("Unauthorized access: Non-member tried to create order");
        throw new Error("Access Denied: Only members can place orders.");
    }

    try {
        await dbConnect();
        
        const ordersToCreate = toyItems.map(item => ({
            user: session.user._id,    
            artToy: item._id,          
            orderAmount: item.orderAmount 
        }));

        // ADD Order to database
        await Order.insertMany(ordersToCreate); 

        revalidatePath("/cart");
        revalidatePath("/orders");

    } 
        //for debug      
        catch (error) {
        console.error("Failed to create orders:", error);
        throw new Error("Could not save orders to database."); 
    }
}