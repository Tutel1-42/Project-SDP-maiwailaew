import ItemsCart from "@/components/ItemsCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

export default async function CartPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) redirect("/api/auth/signin");

    if (session.user.role !== "member") {
        return (
            <main className="w-full flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md border border-gray-200">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Access Denied
                    </h1>
                    <p className="text-lg text-gray-700 mb-2">
                        Only users with <span className="font-bold text-blue-600">'member'</span> role view their cart.
                    </p>
                </div>
            </main>
        );
    }

    const response = await fetch(`${process.env.API_URL}/api/v1/orders`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session.user.token}`
        },
        cache: "no-store" 
    });

    if (!response.ok) {
        return <div className="p-10 text-red-500">Failed to load orders</div>;
    }

    const result = await response.json();
    const myOrders = result.data; 

    return (
        <main className="p-10 min-h-screen bg-slate-50">
            <h1 className="text-2xl font-bold mb-5 text-indigo-800">My Pre-Orders Management</h1>
            <ItemsCart orders={myOrders} />
        </main>
    );
}