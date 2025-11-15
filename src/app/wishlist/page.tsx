import getToys from "@/libs/getToys";
import WishlistDisplay from "@/components/WishListDisplay";

export default async function WishlistPage() {
    
    const toys = await getToys(); 

    return (
        <main className="p-5 min-h-screen bg-sky-100">
            <h1 className="text-3xl font-bold text-center mb-6">My Wishlist</h1>
            <WishlistDisplay allToys={toys.data} />
        </main>
    )
}