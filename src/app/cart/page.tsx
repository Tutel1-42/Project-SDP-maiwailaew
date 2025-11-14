import ItemsCart from "@/components/ItemsCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/db/dbConnect";
import Order from "@/db/models/Order";
import { redirect } from "next/navigation";
import "@/db/models/Toy"

export default async function CartPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/api/auth/signin");

    await dbConnect();

    if (session.user.role !== "member") {
        return (
            <main className="w-full flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md border border-gray-200">
                    
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Access Denied
                    </h1>
                    
                    <p className="text-lg text-gray-700 mb-2">
                        Only users with member role can view their cart.
                    </p>
                    
                </div>
            </main>
        );
    }

    const myOrders = await Order.find({ user: session.user._id })
        .populate({
            path: "artToy",
            select: "name picture"
        });

    return (
        <main className="p-10">
            <ItemsCart orders={JSON.parse(JSON.stringify(myOrders))} />
        </main>
    );
}