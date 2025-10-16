"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product as ProductType } from "./CartContext";

interface WishlistContextType {
  wishlist: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (id: number | string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wishlistData");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to parse wishlistData from localStorage", e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("wishlistData", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlistData to localStorage", e);
      }
    }
  }, [wishlist]);

  const addToWishlist = (product: ProductType) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
