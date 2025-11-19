"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { revalidatePath, revalidateTag } from "next/cache";

//Update Order 
export async function updateOrderAmount(orderId: string, newAmount: number) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("Not authenticated");
    }

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                orderAmount: newAmount
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update order");
        }
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }

    revalidatePath("/cart"); 
    revalidatePath("/adminMenu/orders");
    revalidateTag("toys"); 
}

// Delete Order
export async function deleteOrder(orderId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("Not authenticated");
    }

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${session.user.token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete order");
        }
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }

    revalidatePath("/cart");
    revalidatePath("/adminMenu/orders");
    revalidateTag("toys"); 
}

// 3. Create Order
export async function createSingleOrder(artToyId: string, amount: number) {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.token) {
        throw new Error("User is not authenticated");
    }
    
    if (session.user.role !== 'member') {
        throw new Error("Access Denied: Only members can place orders.");
    }

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                artToy: artToyId,   
                orderAmount: amount 
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create order");
        }

    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }

    revalidatePath("/orders"); 
    revalidatePath("/cart");   
    revalidateTag("toys"); 
} 