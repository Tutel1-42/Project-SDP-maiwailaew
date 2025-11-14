import { dbConnect } from "@/db/dbConnect"
import Toy from "@/db/models/Toy"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function EditToyPage({ params }: { params: { toyId: string } }) {

    // fetch data
    await dbConnect();
    const toy = await Toy.findById(params.toyId);

    const updateToy = async (formData: FormData) => {
        "use server"
        
        // Get data from admin input
        const name = formData.get("name");
        const description = formData.get("desc");
        const posterPicture = formData.get("posterPicture");
        const arrivalDate = formData.get("arrivalDate") as string;
        const availableQuota = formData.get("availableQuota");
        const sku = formData.get("sku");

        try {
            await dbConnect();
            await Toy.findByIdAndUpdate(params.toyId, {
                name,
                description,
                posterPicture,
                arrivalDate,
                availableQuota: Number(availableQuota),
                sku
            });
        } catch (error) {
            console.log(error);
        }

        revalidateTag("toys");
        redirect("/adminMenu/manage"); 
    }

    // formสำหรับใส่input
    return (
        <main className="bg-slate-100 p-5">
            <h1 className="text-xl text-blue-700">Edit Toy: {toy.name}</h1>
            
            <form action={updateToy}>
                <div className="my-2">
                    <label>SKU</label>
                    <input type="text" name="sku" defaultValue={toy.sku}
                           className="bg-white border-2 rounded w-full p-2" />
                </div>
                <div className="my-2">
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={toy.name}
                           className="bg-white border-2 rounded w-full p-2" />
                </div>
                <div className="my-2">
                    <label>Description</label>
                    <input type="text" name="desc" defaultValue={toy.description}
                           className="bg-white border-2 rounded w-full p-2" />
                </div>
                <div className="my-2">
                    <label>Picture URL</label>
                    <input type="text" name="posterPicture" defaultValue={toy.posterPicture}
                           className="bg-white border-2 rounded w-full p-2" />
                </div>
                <div className="my-2">
                    <label>Arrival Date</label>
                    <input type="date" name="arrivalDate" 
                           defaultValue={new Date(toy.arrivalDate).toISOString().split("T")[0]}
                           className="bg-white border-2 rounded w-auto p-2" />
                </div>
                <div className="my-2">
                    <label>Available Quota</label>
                    <input type="number" name="availableQuota" defaultValue={toy.availableQuota}
                           min={1} max={100}
                           className="bg-white border-2 rounded w-auto p-2" />
                </div>

                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded">
                    Save Changes
                </button>
            </form>
        </main>
    );
}