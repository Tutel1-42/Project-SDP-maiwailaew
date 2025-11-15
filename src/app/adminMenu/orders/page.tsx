import { dbConnect } from "@/db/dbConnect"
import Order from "@/db/models/Order"
import User from "@/db/models/User"
import Toy from "@/db/models/Toy" 
import ItemsCart from "@/components/ItemsCart" 
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function ManageOrdersPage() {

    // check if admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect("/");
    }

    await dbConnect();
    
    // Fetch ข้อมูลของทุกคน
    const orders = await Order.find()
        .sort({ createdAt: -1 }) // เรียงจากใหม่ไปเก่า
        .populate({
            path: 'user',
            model: User,
            select: 'name email' 
        })
        .populate({ 
            path: 'artToy',
            model: Toy,
            select: 'name picture' 
        });

    return (
        <main className="p-5 min-h-screen bg-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-800">Manage All Orders</h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Total: {orders.length}
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No orders found.</div>
            ) : (
                <ItemsCart orders={JSON.parse(JSON.stringify(orders))} />
            )}
        </main>
    );
}