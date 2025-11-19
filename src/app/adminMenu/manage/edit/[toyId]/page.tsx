import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import getToy from "@/libs/getToy"; 
import { updateToy } from "@/app/actions/toyActions"; 

export default async function EditToyPage({ params }: { params: { toyId: string } }) {

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const toyData = await getToy(params.toyId);
    const toy = toyData.data;

    if (!toy) {
        return <div className="p-5 text-center text-red-500">Error: Toy not found</div>;
    }

    const updateToyWithId = updateToy.bind(null, params.toyId);

    return (
        <main className="bg-slate-100 min-h-screen p-5 flex justify-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl text-blue-800 font-bold mb-6 text-center">
                    Edit Toy: <span className="text-gray-700">{toy.name}</span>
                </h1>
                
                <form action={updateToyWithId} className="bg-white p-8 rounded-lg shadow-lg">
                    
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">SKU</label>
                            <input type="text" name="sku" defaultValue={toy.sku} required
                                className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Name</label>
                            <input type="text" name="name" defaultValue={toy.name} required
                                className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Description</label>
                            <textarea name="desc" defaultValue={toy.description} required rows={3}
                                className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Picture URL</label>
                            <input type="text" name="posterPicture" defaultValue={toy.posterPicture} required
                                className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label className="font-semibold text-gray-700 mb-1">Arrival Date</label>
                                <input type="date" name="arrivalDate" required
                                    defaultValue={new Date(toy.arrivalDate).toISOString().split("T")[0]}
                                    className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="font-semibold text-gray-700 mb-1">Quota</label>
                                <input type="number" name="availableQuota" defaultValue={toy.availableQuota} required
                                    min={1} max={100}
                                    className="bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200">
                        Save Changes
                    </button>
                </form>
            </div>
        </main>
    );
}