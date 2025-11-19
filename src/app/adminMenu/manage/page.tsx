import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import { redirect } from "next/navigation"
import Link from "next/link"
import getToys from "@/libs/getToys" // เรียกใช้ getToys เพื่อดึงข้อมูล
import { addToy, deleteToy } from "@/app/actions/toyActions" // เรียกใช้ Server Actions

export default async function ManageToysPage() {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
        redirect("/")
    }

    const toysData = await getToys(); 
    const toys = toysData.data; 

    const todayString = new Date().toISOString().split("T")[0];

    return (
        <main className="p-5 bg-slate-100 min-h-screen">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Existing Toys</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toys.map((toy: any) => (
                    <div key={toy._id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-blue-800">{toy.name}</h2>
                            <p className="text-sm text-gray-500 mb-1">SKU: {toy.sku}</p>
                            <p className="text-sm text-gray-600 mb-1 font-semibold">Quota: {toy.availableQuota}</p>
                            <p className="text-sm text-gray-600 mb-3">
                                Arrives: {new Date(toy.arrivalDate).toLocaleDateString()}
                            </p>
                        </div>
                        
                        <div className="flex space-x-3 mt-2">
                            <Link href={`/adminMenu/manage/edit/${toy._id}`}>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded text-sm font-medium transition">
                                    Edit
                                </button>
                            </Link>

                            <form action={deleteToy}>
                                <input type="hidden" name="toyId" value={toy._id} />
                                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium transition"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-10 border-t-2 border-gray-300" />
            
            <form action={addToy} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto border border-gray-200">
                <div className="text-2xl text-blue-800 mb-6 font-bold border-b pb-2">Create New Toy</div>
                
                <div className="flex flex-col space-y-5">
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="sku">SKU</label>
                        <input type="text" required id="sku" name="sku" placeholder="Toy SKU"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="name">Name</label>
                        <input type="text" required id="name" name="name" placeholder="Toy Name"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="desc">Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Description"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-medium" htmlFor="posterPicture">Picture URL</label>
                        <input type="text" required id="posterPicture" name="posterPicture" placeholder="https://..."
                        className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center flex-1">
                            <label className="w-32 sm:w-24 text-gray-700 font-medium" htmlFor="arrivalDate">Arrival</label>
                            <input type="date" required id="arrivalDate" name="arrivalDate"
                            min={todayString} 
                            className="w-full bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className="flex items-center flex-1">
                            <label className="w-auto mr-3 text-gray-700 font-medium" htmlFor="availableQuota">Quota</label>
                            <input type="number" required id="availableQuota" name="availableQuota" placeholder="10"
                            min={1} max={1000}
                            className="w-full bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded mt-6 transition duration-200 shadow-md">
                        Add New Toy
                    </button>
                </div>
            </form> 
        </main>
    )
}