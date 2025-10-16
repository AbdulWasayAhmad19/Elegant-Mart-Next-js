'use client';

import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import type { Product } from "./context/CartContext";

interface Slide {
  src: string;
  alt: string;
}

interface Category {
  name: string;
  image: string;
}

interface Database {
  slideshow?: Slide[];
  categories?: Category[];
  products?: Product[];
}

export default function HomePage() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const [slideIndex, setSlideIndex] = useState(0);
  const [database, setDatabase] = useState<Database | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // 🌐 Fetch the database.json from public folder
  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => {
        setDatabase(data);
        setProducts(data.products || []);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // 🎞️ Slideshow effect
  useEffect(() => {
    if (!database?.slideshow) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % database.slideshow!.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [database]);

  if (!database) {
    return <div className="pt-24 text-center text-lg">Loading...</div>;
  }

  return (
    <>
      
      <main className="bg-[#f9f9f9] min-h-screen pt-24 mb-0">
      {/* SLIDESHOW */}
      <div className="overflow-hidden relative md:mx-10">
        <div className="flex justify-end bg-white px-4 py-2 md:hidden">
          <Link href="/all-products" className="text-[#dc3545] font-semibold">
            All Products
          </Link>
        </div>

        <div className="slideshow w-full rounded-lg relative h-[250px] md:h-[400px]">
          {database.slideshow?.map((slide, i) => (
            <Image
              key={i}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`rounded-lg object-contain md:object-cover transition-opacity duration-700 ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🛍️ SHOP BY CATEGORY */}
      <div
        className="rounded-lg mx-2 md:mx-10 bg-white flex overflow-x-auto scroll-smooth p-5 md:p-10 gap-2 
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {database.categories?.map((cat, i) => (
          <Link
            key={i}
            href={`/${cat.name.toLowerCase()}`}
            className="group flex-none cursor-pointer w-40 md:w-52"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-lg border-white border-[3px] group-hover:border-[#dc3545] transition-transform duration-200">
              <Image
                src={cat.image}
                alt={cat.name}
                width={208}
                height={208}
                unoptimized
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-center mt-2 font-medium group-hover:text-[#dc3545] transition">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>

      {/* ULTRA FRESH SECTION */}
      <div className="mx-2 md:mx-10">
        <Image
          src="/Images/Vegetables pic.png"
          alt="Vegetables"
          width={1200}
          height={400}
          className="rounded-lg w-full transition-transform duration-300"
        />
      </div>

      {/* PRODUCTS SECTION */}
      <div
        className="rounded-lg my-6 md:my-10 bg-white mx-2 md:mx-10 flex overflow-x-auto scroll-smooth p-6 md:p-10 gap-6 
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="group flex-none w-56 sm:w-64 md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
          >
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image || ''}
                alt={product.name}
                width={250}
                height={200}
                className="w-full h-44 sm:h-52 object-contain rounded-lg mb-3"
              />
              <p className="text-center mt-2 font-semibold text-base sm:text-lg text-black">
                {product.name}
              </p>
              <p className="text-center text-gray-500 text-sm mb-3">
                {product.unit}
              </p>
            </Link>

            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">
                Rs {product.price || "N/A"}
              </span>

              <div className="flex items-center gap-3">
                {/* ❤️ Wishlist Icon */}
                <button
                  onClick={() => {
                    const isInWishlist = wishlist.some(
                      (item: Product) => item.id === product.id
                    );
                    if (isInWishlist) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  className={`transition ${
                    wishlist.some((item: Product) => item.id === product.id)
                      ? "text-[#dc3545]"
                      : "text-gray-400 hover:text-[#dc3545]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      wishlist.some((item: Product) => item.id === product.id)
                        ? "#dc3545"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-6 h-6 hover:scale-110 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.02-4.5-4.5-4.5-1.74 0-3.223.99-4 2.445A4.491 4.491 0 008.5 3.75C6.02 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                    />
                  </svg>
                </button>

                {/* 🛒 Add to Cart Icon */}
                <button onClick={() => addToCart(product)}>
                  <Image
                    src="/Images/add-to-cart.png"
                    width={28}
                    height={28}
                    className="hover:scale-110 transition-transform"
                    alt="Add to cart"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </main>
      
    </>
  );
}
