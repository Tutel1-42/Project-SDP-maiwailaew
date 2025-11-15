import OrderForm from "./OrderForm"; 
import getToys from "@/libs/getToys";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { getPastOrderedToyIds } from "@/libs/getPastOrders"; 
import { redirect } from "next/navigation";

export default async function OrdersPage() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
        redirect("/api/auth/signin");
    }

    if (session.user.role !== "member") {
        return (
            <main className="w-full flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md border border-gray-200">
                    
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Access Denied
                    </h1>
                    
                    <p className="text-lg text-gray-700 mb-2">
                        User must have member role to order Art Toys.
                    </p>
                    
                </div>
            </main>
        );
    }

    const [toysResponse, pastOrderedToyIds] = await Promise.all([
        getToys(), // ดึง Toy ทั้งหมด
        getPastOrderedToyIds(session.user._id) // ดึงประวัติ
    ]);

    const allToys = toysResponse.data || [];

    //ส่งข้อมูลป็น Props ให้ Client Component
    return (
        <OrderForm 
            allToys={allToys} 
            pastOrderedToyIds={pastOrderedToyIds} 
        />
    );
}