import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions" 
import User from "@/db/models/User" 
import { dbConnect } from "@/db/dbConnect"
import Link from "next/link"
import { addToy } from "@/app/actions/toyActions" 

export default async function DashboardPage() {

    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        return (
            <main className="flex justify-center items-center h-[70vh]">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
                    <p className="text-lg mt-2">You must be signed in to view this page.</p>
                    <Link href="/api/auth/signin">
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign In
                        </button>
                    </Link>
                </div>
            </main>
        )
    }

    await dbConnect();
    const userProfile = await User.findById(session.user._id);

    if (!userProfile) {
        return <div className="p-5 text-red-500">Error: User not found in database.</div>;
    }

    if (userProfile.role !== "admin") {
        return (
            <main className="flex justify-center items-center h-[70vh]">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
                    <p className="text-lg mt-2">Only users with the 'admin' role can view this page.</p>
                    <p className="text-md mt-1 text-gray-600">Your current role is: <span className="font-semibold capitalize">{userProfile.role}</span></p>
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

            <div className="my-6">
                <h2 className="text-xl text-blue-700 mb-2 font-bold">Admin Actions</h2>
                <div className="flex space-x-4">
                     <Link href="/adminMenu/manage">
                        <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded shadow-sm">
                            Manage/Edit Toys
                        </button>
                    </Link>
                    <Link href="/adminMenu/orders">
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded shadow-sm">
                            Manage Orders
                        </button>
                    </Link>
                </div>
            </div>

            <form action={addToy} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <div className="text-xl text-blue-700 mb-4 font-bold">Create New Toy</div>
                
                 <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="sku">SKU</label>
                        <input type="text" required id="sku" name="sku" placeholder="Toy SKU"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="name">Name</label>
                        <input type="text" required id="name" name="name" placeholder="Toy Name"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="desc">Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Description"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="posterPicture">Picture URL</label>
                        <input type="text" required id="posterPicture" name="posterPicture" placeholder="https://..."
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center flex-1">
                            <label className="w-32 text-gray-700 font-medium" htmlFor="arrivalDate">Arrival Date</label>
                            <input type="date" required id="arrivalDate" name="arrivalDate"
                            min={todayString} 
                            className="w-full bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex items-center flex-1">
                            <label className="w-auto mr-4 text-gray-700 font-medium" htmlFor="availableQuota">Quota</label>
                            <input type="number" required id="availableQuota" name="availableQuota" placeholder="10"
                            min={1} max={100}
                            className="w-full bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200">
                        Add New Toy
                    </button>
                </div>
            </form> 
        </main>
    )
}