// 'use client';

// import { useEffect, useState } from "react";
// import { useWishlist } from "./context/WishlistContext";
// import { useCart } from "./context/CartContext";

// import Image from "next/image";

// interface Product {
//   id: number | string;
//   name: string;
//   price: number;
//   unit?: string;
//   image?: string;
// }

// interface Database {
//   products: Product[];
//   icons?: {
//     wishlist?: string;
//     cart?: string;
//   };
// }

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const [database, setDatabase] = useState<Database | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

//   // ✅ Fetch data from local database.json
//   useEffect(() => {
//     fetch("/database.json")
//       .then((res) => res.json())
//       .then((data: Database) => {
//         setDatabase(data);
//         setRelatedProducts(data.products.slice(0, 8)); // Pick first 8 products
//       })
//       .catch((err) => console.error("Error loading database.json:", err));
//   }, []);

//   // ⏳ Loading state
//   if (!database) {
//     return (
//       <div className="mt-28 text-center text-gray-500">
//         Loading wishlist...
//       </div>
//     );
//   }

//   // 🛍️ Empty Wishlist
//   if (wishlist.length === 0) {
//     return (
//       <>
        
//         <div className="mt-28 flex flex-col items-center justify-center text-gray-700 px-4 min-h-[60vh]">
//           <Image
//             src={database.icons?.wishlist || "/Images/wishlist.svg"}
//             alt="Empty wishlist"
//             width={224}
//             height={224}
//             className="object-contain mb-4"
//           />
//           <p className="text-lg font-medium">Your wishlist is empty.</p>
//         </div>
        
//       </>
//     );
//   }

//   // 💖 Wishlist Page
//   return (
//     <>
      
//       <div className="mt-28 mb-0 px-4 md:px-10 min-h-screen bg-gray-50">
//         <h2 className="text-2xl font-bold mb-6 text-[#dc3545]">❤️ My Wishlist</h2>

//         {/* Wishlist Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
//           {wishlist.map((product) => (
//             <div
//               key={product.id}
//               className="group bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
//             >
//               {/* Remove from Wishlist */}
//               <button
//                 onClick={() => removeFromWishlist(product.id)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-[#dc3545] transition"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>

//               {/* Product Image */}
//               {product.image ? (
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={200}
//                   height={200}
//                   className="w-full h-40 sm:h-52 object-contain rounded-lg mb-3"
//                 />
//               ) : (
//                 <div className="w-full h-40 sm:h-52 bg-gray-100 rounded-lg mb-3" />
//               )}

//               {/* Product Info */}
//               <p className="text-center mt-2 font-semibold text-base sm:text-lg text-gray-900">
//                 {product.name}
//               </p>
//               <p className="text-center text-gray-500 text-sm mb-3">
//                 {product.unit}
//               </p>

//               {/* Price + Add to Cart */}
//               <div className="flex justify-between items-center">
//                 <span className="font-bold text-lg text-gray-900">
//                   Rs {product.price}
//                 </span>
//                 <button
//                   onClick={() =>
//                     addToCart({
//                       id: product.id,
//                       name: product.name,
//                       price: product.price,
//                       unit: product.unit,
//                       image: product.image,
//                     })
//                   }
//                 >
//                   <Image
//                     src={database.icons?.cart || "/Images/add-to-cart.png"}
//                     alt="Add to cart"
//                     width={28}
//                     height={28}
//                     className="hover:scale-110 transition-transform"
//                   />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Related Products */}
//         <div className="mt-10 pb-10">
//           <h3 className="text-xl font-semibold mb-4 text-[#dc3545]">
//             Related Products
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {relatedProducts.map((item) => (
//               <div
//                 key={item.id}
//                 className="group bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition"
//               >
//                 {item.image ? (
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={200}
//                     height={200}
//                     className="w-full h-40 sm:h-48 object-contain mb-3 rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-lg mb-3" />
//                 )}

//                 <p className="text-center mt-1 font-semibold text-base sm:text-lg text-gray-900">
//                   {item.name}
//                 </p>
//                 <p className="text-center text-gray-500 text-sm mb-3">
//                   {item.unit}
//                 </p>
//                 <div className="flex justify-between items-center">
//                   <span className="font-bold text-lg text-gray-900">
//                     Rs {item.price}
//                   </span>
//                   <button onClick={() => addToCart(item as Product)}>
//                     <Image
//                       src={database.icons?.cart || "/Images/add-to-cart.png"}
//                       alt="Add to cart"
//                       width={28}
//                       height={28}
//                       className="hover:scale-110 transition-transform"
//                     />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//     </>
//   );
// }



'use client';

import { useEffect, useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number | string;
  name: string;
  price: number;
  unit?: string;
  image?: string;
}

interface Database {
  products: Product[];
  icons?: {
    wishlist?: string;
    cart?: string;
  };
}

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [database, setDatabase] = useState<Database | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // ✅ Fetch database.json
  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data: Database) => {
        setDatabase(data);
        setRelatedProducts(data.products.slice(0, 8));
      })
      .catch((err) => console.error("Error loading database.json:", err));
  }, []);

  if (!database) {
    return (
      <div className="mt-28 text-center text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  // 🛍️ Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="mt-28 flex flex-col items-center justify-center text-gray-700 px-4 min-h-[60vh]">
        <Image
          src={database.icons?.wishlist || "/Images/wishlist.svg"}
          alt="Empty wishlist"
          width={224}
          height={224}
          className="object-contain mb-4"
        />
        <p className="text-lg font-medium">Your wishlist is empty.</p>
      </div>
    );
  }

  // 💖 Wishlist page
  return (
    <div className="mt-28 mb-10 px-4 md:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#dc3545]">❤️ My Wishlist</h2>

      {/* Wishlist Grid (same size as homepage cards) */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group flex-none w-56 sm:w-64 md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
          >
            {/* ❌ Remove from wishlist */}
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#dc3545] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* 🖼️ Product Image */}
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image || ""}
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

            {/* 💰 Price & Cart */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">
                Rs {product.price}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={database.icons?.cart || "/Images/add-to-cart.png"}
                  alt="Add to cart"
                  width={28}
                  height={28}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🛒 Related Products Section */}
      <div className="mt-10 pb-10">
        <h3 className="text-xl font-semibold mb-4 text-[#dc3545]">
          Related Products
        </h3>

        <div className="flex flex-wrap gap-6 justify-center">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="group flex-none w-56 sm:w-64 md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
            >
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image || ""}
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
                  Rs {product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    src={database.icons?.cart || "/Images/add-to-cart.png"}
                    alt="Add to cart"
                    width={28}
                    height={28}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
