"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { dbConnect } from "@/db/dbConnect";
import Order from "@/db/models/Order";
import { revalidatePath } from "next/cache";

// update order
export async function updateOrderAmount(orderId: string, newAmount: number) {
    const session = await getServerSession(authOptions);
    //กันคนไม่ sign in
    if (!session) throw new Error("Not authenticated");

    // check amount
    if (newAmount < 1 || newAmount > 5) {
        throw new Error("Amount must be between 1 and 5");
    }

    await dbConnect();

    let query: any = { _id: orderId };

    if (session.user.role !== 'admin') {
        query.user = session.user._id;
    }
    
    const order = await Order.findOneAndUpdate(
        query, 
        { orderAmount: newAmount },
        { new: true }
    );

    //หาไม่เจอ
    if (!order) throw new Error("Order not found or unauthorized");

    revalidatePath("/cart"); 
    revalidatePath("/adminMenu/orders");
}

// delete order
export async function deleteOrder(orderId: string) {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Not authenticated");

    await dbConnect();

    let query: any = { _id: orderId };

    if (session.user.role !== 'admin') {
        query.user = session.user._id;
    }

    const order = await Order.findOneAndDelete(query);

    if (!order) throw new Error("Order not found or unauthorized");

    revalidatePath("/cart"); 
}

export async function createSingleOrder(artToyId: string, amount: number) {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user._id) {
        throw new Error("User is not authenticated");
    }
    if (session.user.role !== 'member') {
        throw new Error("Access Denied: Only members can place orders.");
    }

    if (amount < 1 || amount > 5) {
        throw new Error("Quantity must be between 1 and 5.");
    }
    
    await dbConnect();

    
    
    const existingOrder = await Order.findOne({
        user: session.user._id,
        artToy: artToyId
    });

    if (existingOrder) {
        throw new Error("You have already pre-ordered this toy.");
    }

    try {
        await Order.create({
            user: session.user._id,
            artToy: artToyId,
            orderAmount: amount
        });
    } catch (error) {
        throw new Error("Could not save order to database.");
    }

    revalidatePath("/orders"); 
    revalidatePath("/cart");   
}
