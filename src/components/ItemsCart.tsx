"use client"
// 1. ลบ Imports ของ Redux (useDispatch, useSelector, cartSlice)
// 2. ลบ Imports ที่ไม่ใช้แล้ว (createOrders, useRouter)
import { updateOrderAmount, deleteOrder } from "@/app/actions/orderActions"; 
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { OrderItem } from "../../interfaces"; // Import Type จากส่วนกลาง

export default function ItemsCart({ orders = [] }: { orders: OrderItem[] }) {
    
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === 'admin';
    // 3. ลบ State และ Hooks ที่เกี่ยวกับ Redux ทั้งหมด
    // (cartItems, dispatch, router, isConfirming)

    // 4. คงเหลือไว้เฉพาะ State สำหรับ Server Actions (DB)
    const [isPending, startTransition] = useTransition();

    // 5. ลบ handleConfirmOrder() ทิ้ง (เพราะย้ายไป OrderForm แล้ว)

    // 6. คง Handlers สำหรับ DB ไว้
    const handleUpdateDB = (orderId: string, amount: number) => {
        if (amount < 1 || amount > 5) return;
        startTransition(async () => {
            await updateOrderAmount(orderId, amount);
        });
    };

    const handleDeleteDB = (orderId: string) => {
        if(!confirm("Are you sure you want to cancel this order?")) return;
        startTransition(async () => {
            await deleteOrder(orderId);
        });
    };

    return (
        // 7. ลบ div ครอบตัวแรกที่มี space-y-10 ออก
        <div>
            
            {/* 8. ❌❌ ลบ SECTION 1 (Redux Cart) ทั้งหมด ❌❌ */}
            {/* { !isAdmin && ( ... )} */}


            {/* 9. ✅✅ เหลือแค่ SECTION 2 (Database List) ✅✅ */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-indigo-800">
                    {isAdmin ? "Existing Customer Orders" : "My Pre-Orders"}
                </h2>
                
                {orders.length === 0 ? (
                    <p className="text-gray-400 italic">No confirmed orders found.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white border border-gray-200 p-4 rounded shadow flex justify-between items-center">
                                
                                {!order.artToy ? (
                                    <div className="text-red-500">Unknown Toy (Data Error)</div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-semibold">{order.artToy.name}</h3>
                                        <p className="text-gray-500 text-xs">Order ID: {order._id}</p>

                                        { isAdmin && order.user && (
                                            <div className="mt-2 text-sm bg-indigo-50 text-indigo-800 p-1 px-2 rounded inline-block">
                                                User: <span className="font-bold">{order.user.name}</span> 
                                                <span className="text-xs text-indigo-500 ml-1">({order.user.email})</span>
                                            </div>
                                       )}
                                    </div>
                                )}

                                <div className="flex items-center space-x-3">
                                    <button 
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                        onClick={() => handleUpdateDB(order._id, order.orderAmount - 1)}
                                        disabled={isPending || order.orderAmount <= 1}
                                    >-</button>
                                    
                                   <span className="font-bold w-4 text-center">{order.orderAmount}</span>

                                    <button 
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                        onClick={() => handleUpdateDB(order._id, order.orderAmount + 1)}
                                        disabled={isPending || order.orderAmount >= 5}
                                   >+</button>

                                    <button 
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-4 text-sm"
                                     onClick={() => handleDeleteDB(order._id)}
                                        disabled={isPending}
                                   >
                                        {isPending ? "..." : "Cancel"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}