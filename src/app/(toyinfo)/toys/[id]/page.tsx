import Image from "next/image";
import getToy from "@/libs/getToy";
import Link from "next/link";

export default async function toyDetailPage({params,}:
    {params: { id: string };}) {
        
  const toyDetail = await getToy(params.id);

  const formattedDate = new Date(toyDetail.data.arrivalDate).toLocaleDateString(
    "en-GB", 
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <main className="p-5 bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row my-5 bg-white shadow-xl rounded-lg max-w-4xl p-8 gap-8">
        <div className="shrink-0">
          <Image
            src={toyDetail.data.posterPicture}
            alt="Toy Image"
            width={400} 
            height={400}
            className="rounded-lg object-cover w-full md:w-[400px]"
            priority
          />
        </div>

        <div className="text-md text-left flex flex-col justify-between">
          {/* Toy's informations */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">
              {toyDetail.data.name}
            </h1>

            <p className="text-md text-gray-500 font-mono">
              SKU: {toyDetail.data.sku}
            </p>
            
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Description:</span>{" "}
              {toyDetail.data.description}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Arrival Date:</span> {formattedDate}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Available Quota:</span>{" "}
              {toyDetail.data.availableQuota}
            </p>
          </div>

          <div className="mt-8">
              <Link href={`/orders`}>
                <button className="block rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-bold shadow-md transition transform hover:scale-105">
                  Pre-order Now
                </button>
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}