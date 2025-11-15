"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { WishlistContextType } from '../../../interfaces';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        try {
            const storedWishlist = localStorage.getItem('wishlist');
            if (storedWishlist) {
                setWishlist(JSON.parse(storedWishlist));
            }
        } catch (error) {
            console.error("Failed to load wishlist from local storage", error);
        }
    }, []);

    const updateLocalStorage = (updatedList: string[]) => {
        setWishlist(updatedList);
        localStorage.setItem('wishlist', JSON.stringify(updatedList));
    };

    const addToWishlist = (toyId: string) => {
        if (!wishlist.includes(toyId)) {
            const updatedList = [...wishlist, toyId];
            updateLocalStorage(updatedList);
        }
    };

    const removeFromWishlist = (toyId: string) => {
        const updatedList = wishlist.filter(id => id !== toyId);
        updateLocalStorage(updatedList);
    };

    const isWishlisted = (toyId: string) => {
        return wishlist.includes(toyId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};