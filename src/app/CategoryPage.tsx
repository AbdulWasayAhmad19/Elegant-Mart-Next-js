
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

interface Product {
  id: number | string;
  name: string;
  category?: string;
  price: number;
  image?: string;
  size?: string;
  unit?: string;
}

export default function CategoryPage({ categoryNameParam }: { categoryNameParam?: string }) {
  // Accept an optional prop (used by wrapper route); fallback to useParams when run as page
  const params = useParams() as { categoryName?: string } | undefined;
  const paramName = categoryNameParam ?? params?.categoryName;
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  useEffect(() => {
    if (products.length > 0 && paramName) {
      const cleanCategory = decodeURIComponent(paramName).trim().toLowerCase();
      const filtered = products.filter((item) => (item.category || "").trim().toLowerCase() === cleanCategory);
      setFilteredProducts(filtered);
    }
  }, [paramName, products]);

  if (!paramName) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-700">Category not specified.</p>
      </main>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 capitalize">{decodeURIComponent(paramName)}</h2>
        <p className="text-gray-500 mb-6">No products found in this category.</p>
        <Link href="/" className="bg-[#dc3545] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#dc3545] border border-[#dc3545] transition">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f9f9f9] min-h-screen pt-24 pb-10">
      <div className="mx-2 md:mx-10 bg-white rounded-lg p-5 md:p-10 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-[#dc3545] mb-6 text-center capitalize">{decodeURIComponent(paramName)}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const isInWishlist = wishlist.some((item: any) => item.id === product.id);

            return (
              <div key={product.id} className="group bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative">
                <div className="cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                  <Image src={product.image || "/Images/placeholder.png"} alt={product.name} width={200} height={200} className="w-full object-contain rounded-lg mb-3" />
                  <p className="text-center mt-2 font-semibold text-base sm:text-lg">{product.name}</p>
                  <p className="text-center text-gray-700 text-sm mb-3">{product.size || product.unit}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">Rs {product.price}</span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist) removeFromWishlist(product.id as any);
                        else addToWishlist(product as any);
                      }}
                      className={`transition ${isInWishlist ? "text-[#dc3545]" : "text-gray-600 hover:text-[#dc3545]"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? "#dc3545" : "none"} viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.02-4.5-4.5-4.5-1.74 0-3.223.99-4 2.445A4.491 4.491 0 008.5 3.75C6.02 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z" />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product as any);
                      }}
                    >
                      <Image src="/Images/add-to-cart.png" alt="Add to cart" width={28} height={28} className="hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
