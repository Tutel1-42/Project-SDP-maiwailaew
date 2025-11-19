import ItemsCart from "@/components/ItemsCart" 
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import { redirect } from "next/navigation"

export default async function ManageOrdersPage() {

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect("/");
    }

    const ordersResponse = await fetch(`${process.env.API_URL}/api/v1/orders`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session.user.token}` 
        },
        cache: "no-store" 
    });

    if (!ordersResponse.ok) {
        return <div className="p-5 text-red-500">Failed to fetch orders</div>;
    }

    const ordersJson = await ordersResponse.json();
    const orders = ordersJson.data; 

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
                <ItemsCart orders={orders} />
            )}
        </main>
    );
}