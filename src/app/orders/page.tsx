import OrderForm from "./OrderForm"; 
import getToys from "@/libs/getToys";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

export default async function OrdersPage() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.token) {
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
                         User must have <span className="font-bold text-blue-600">'member'</span> role to order Art Toys.
                    </p>
                </div>
            </main>
        );
    }

    const toysPromise = getToys(); 
    
    const ordersPromise = fetch(`${process.env.API_URL}/api/v1/orders`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
        cache: "no-store" 
    });

    const [toysResponse, ordersResponse] = await Promise.all([toysPromise, ordersPromise]);

    const allToys = toysResponse.data || [];

    let pastOrderedToyIds: string[] = [];
    
    if (ordersResponse.ok) {
        const ordersJson = await ordersResponse.json();
        pastOrderedToyIds = ordersJson.data.map((order: any) => order.artToy._id);
    }

    return (
        <OrderForm 
            allToys={allToys} 
            pastOrderedToyIds={pastOrderedToyIds} 
        />
    );
}