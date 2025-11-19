import Image from "next/image";
import getToy from "@/libs/getToy";
import Link from "next/link";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/libs/authOptions"; 

export default async function toyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const toyDetail = await getToy(params.id);
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const isMember = user?.role === 'member';
  const isAdmin = user?.role === 'admin';
  const isGuest = !user;

  const isOutOfStock = toyDetail.data.availableQuota <= 0;

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
            alt={toyDetail.data.name}
            width={400}
            height={400}
            className="rounded-lg object-cover w-full md:w-[400px]"
            priority
          />
        </div>

        <div className="text-md text-left flex flex-col justify-between">
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
            
            <p className={`text-lg font-semibold ${isOutOfStock ? "text-red-600" : "text-gray-700"}`}>
              <span>Available Quota: </span>
              {isOutOfStock ? "Out of Stock" : toyDetail.data.availableQuota}
            </p>
          </div>

          <div className="mt-8">
            
            {/* no tiem */}
            {isOutOfStock ? (
                <button disabled className="block rounded-lg bg-gray-300 px-6 py-3 text-gray-500 font-bold cursor-not-allowed">
                    Out of Stock
                </button>
            ) : (
                <>
                    {isGuest && (
                        <Link href={`/api/auth/signin`}>
                            <button className="block rounded-lg bg-gray-500 hover:bg-gray-600 px-6 py-3 text-white font-bold shadow-md transition">
                                Sign In to Pre-order
                            </button>
                        </Link>
                    )}

                    {isMember && (
                        <Link href={`/orders`}>
                            <button className="block rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-bold shadow-md transition transform hover:scale-105">
                                Pre-order Now
                            </button>
                        </Link>
                    )}

                    {isAdmin && (
                         <div className="p-3 bg-yellow-100 text-yellow-800 rounded border border-yellow-300 inline-block">
                            Admin View (Cannot order)
                         </div>
                    )}
                </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}