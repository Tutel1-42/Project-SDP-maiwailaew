"use client" 
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { ArtToyType } from '../../interfaces';
import { useWishlist } from "@/redux/features/WishlistContext";

export default function ToyCard({ toy, onCompare }: { 
    toy: ArtToyType, 
    onCompare?: (toyName: string) => void 
}) {

    const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
    const isLiked = isWishlisted(toy._id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        e.preventDefault(); 
        
        if (isLiked) {
            removeFromWishlist(toy._id);
        } else {
            addToWishlist(toy._id);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white transition-transform duration-300 hover:scale-105">
        <InteractiveCard> 
            
            <button
                onClick={handleWishlistToggle}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors
                    ${isLiked ? 'text-red-500 bg-white/80' : 'text-gray-400 bg-white/80 hover:text-red-400'}`}
                aria-label="Toggle Wishlist"
            >
                {isLiked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.63 19.165 5.247 16.11 3.34 13.918 
                        1.433 11.725 1 9.625 1 7.75c0-3.12 2.53-5.65 5.65-5.65 1.518 0 2.94.595 4 1.634 1.06-.98 2.482-1.575 4-1.575 
                        3.12 0 5.65 2.53 5.65 5.65 0 1.875-.433 3.975-2.34 6.168-1.907 2.192-5.29 5.248-6.95 7.092Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                        3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                )}
            </button>

            <div className='w-full'>
                <Image src={toy.posterPicture}
                       alt={toy.name}
                       width={300} 
                       height={300}
                       className='w-full h-auto object-contain'/>
            </div>

            <div className='w-full p-4 text-center font-semibold'>
                {toy.name}
            </div>

            <div className='w-full flex justify-center p-2'>
            {
                onCompare? <button className='block text-sm rounded-md bg-sky-600
                hover:bg-indigo-600 mx-2 px-3 py-2 text-white shadow-sm'
                onClick={(e)=>{e.stopPropagation(); e.preventDefault() ;onCompare(toy.name)}}
                >Compare</button> 
                : null 
            }
            </div>
        </InteractiveCard> 
        </div>
    );
}