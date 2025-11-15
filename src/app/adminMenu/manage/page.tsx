import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import Toy from "@/db/models/Toy"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function ManageToysPage() {
    
    // Security Check
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
        redirect("/")
    }

    // Add Toy 
    const addToy = async (addToyForm:FormData) => {
        "use server"
        const name = addToyForm.get("name")
        const description = addToyForm.get("desc")
        const posterPicture = addToyForm.get("posterPicture") 
        const arrivalDateString = addToyForm.get("arrivalDate") as string
        const availableQuota = addToyForm.get("availableQuota") 
        const sku = addToyForm.get("sku")

        if (!arrivalDateString) {}
        const selectedDate = new Date(arrivalDateString);
        selectedDate.setHours(0, 0, 0, 0);

        try {
            await dbConnect()
            await Toy.create({
                "name": name,
                "description": description,
                "posterPicture": posterPicture,
                "arrivalDate": selectedDate, 
                "availableQuota": Number(availableQuota), 
                "sku": sku,
            })
        }
        catch(error) {
            console.log(error) 
            return; 
        }
        revalidateTag("toys") 
        redirect("/adminMenu/manage") 
    }

    // Delete Toy 
    const deleteToy = async (formData: FormData) => {
        "use server"
        const toyId = formData.get("toyId");
        try {
            await dbConnect();
            await Toy.findByIdAndDelete(toyId);
            revalidateTag("toys");
        } catch (error) {
            console.log(error);
        }
    }

    await dbConnect();
    const toys = await Toy.find().sort({ createdAt: -1 }); // sort new to old
    const todayString = new Date().toISOString().split("T")[0]; 

    return (
        <main className="p-5 bg-slate-100 min-h-screen">
            
            {/* Manage Toys */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Existing Toys</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toys.map((toy) => (
                    <div key={toy._id} className="bg-white p-4 rounded-lg shadow-md border">
                        <h2 className="text-xl font-bold mb-2">{toy.name}</h2>
                        <p className="text-sm text-gray-500 mb-1">SKU: {toy.sku}</p>
                        <p className="text-sm text-gray-600 mb-1">Quota: {toy.availableQuota}</p>
                        <p className="text-sm text-gray-600 mb-3">
                            Arrives: {new Date(toy.arrivalDate).toLocaleDateString()}
                        </p>
                        
                        <div className="flex space-x-3">
                            <Link href={`/adminMenu/manage/edit/${toy._id}`}>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                                    Edit
                                </button>
                            </Link>

                            <form action={deleteToy}>
                                <input type="hidden" name="toyId" value={toy._id.toString()} />
                                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add new toy  */}
            <hr className="my-10 border-t-2 border-gray-300" />
            
            <form action={addToy} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <div className="text-2xl text-blue-700 mb-4 font-bold">Create New Toy</div>
                
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