import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import User from "@/db/models/User" 
import { dbConnect } from "@/db/dbConnect"
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await getServerSession(authOptions)

    if (!session) redirect("/api/auth/signin");

    await dbConnect();
    const userProfile = await User.findById(session.user._id);

    // หา User ไม่เจอ
    if (!userProfile) {
        return <div className="p-5 text-red-500">Error: User not found in database.</div>;
    }

    // กัน non admin เข้า
    if (userProfile.role !== "admin") {
        return (
            <main className="flex justify-center items-center h-[70vh]">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
                    <p className="text-lg mt-2">Only users with the 'admin' role can view this page.</p>
                </div>
            </main>
        )
    }

    const createdAt = new Date(userProfile.createdAt);
    const todayString = new Date().toISOString().split("T")[0];

    return (
        <main className="bg-slate-100 pl-5 min-h-screen">
            <div className="text-2xl pt-5 font-bold">{userProfile.name}</div>
            
            <table className="table-auto border-separate border-spacing-2 mt-4"><tbody>
                <tr><td className="font-semibold">Email</td><td>{userProfile.email}</td></tr>
                <tr><td className="font-semibold">Tel</td><td>{userProfile.tel}</td></tr>
                <tr><td className="font-semibold">Member Since</td><td>{createdAt.toLocaleDateString()}</td></tr>
            </tbody></table>

            {
                (userProfile.role == "admin") ?
                <> 
                    <div className="my-6">
                        <h2 className="text-xl text-blue-700 mb-2 font-bold">Admin Actions</h2>
                        <div className="flex space-x-4">
                            
                            <Link href="/adminMenu/manage">
                                <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded shadow-sm">
                                    Manage/Edit/Add Toys
                                </button>
                            </Link>

                            <Link href="/adminMenu/orders">
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded shadow-sm">
                                    Manage Orders
                                </button>
                            </Link>

                        </div>
                    </div>
                </>
                : null
            }
        </main>
    )
}