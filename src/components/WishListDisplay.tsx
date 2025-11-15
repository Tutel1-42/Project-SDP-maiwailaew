"use client"
import { useWishlist } from "@/redux/features/WishlistContext";
import { ArtToyType } from "../../interfaces";
import ToyCard from "./ToyCard";
import Link from "next/link";

export default function WishlistDisplay({ allToys }: { allToys: ArtToyType[] }) {
    
    const { wishlist } = useWishlist();

    const wishlistedToys = allToys.filter(toy => wishlist.includes(toy._id));

    return (
        <div>
            {wishlistedToys.length === 0 ? (
                <p className="text-center text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div style={{margin:"20px", display:"flex", flexDirection:"row",
                            flexWrap:"wrap",padding:"10px", justifyContent:"space-around",
                            alignContent:"space-around",alignItems: "flex-start"}}>
                    {
                        wishlistedToys.map((toyItem) => (
                            <div key={toyItem.sku} className="w-full sm:w-[50%] 
                                md:w-[30%] lg:w-[25%] p-2 sm:p-4">
                                
                                <Link href ={`/toys/${toyItem._id}`}>
                                    <ToyCard toy={toyItem}/>
                                </Link>

                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}