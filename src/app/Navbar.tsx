// 'use client';

// import React, { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { useCart } from "./context/CartContext";
// import { useWishlist } from "./context/WishlistContext";

// interface Category {
//   id: number;
//   name: string;
// }

// interface Icons {
//   martlogo?: string;
//   profile?: string;
//   wishlist?: string;
//   home?: string;
//   cart?: string;
//   [key: string]: string | undefined;
// }

// export default function Navbar() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isSearchOpen, setSearchOpen] = useState(false);
//   const [isDeliverOpen, setDeliverOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [icons, setIcons] = useState<Icons>({});
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();

//   const pathname = usePathname() ?? "";
//   const isAdmin = pathname.startsWith("/admin");

//   // ✅ Fetch categories and icons from database.json
//   useEffect(() => {
//     fetch("/database.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data.categories || []);
//         setIcons(data.icons || {});
//       })
//       .catch((err) => console.error("Error loading database:", err));
//   }, []);

//   return (
//     <>
//       {/* ================== Navbar Header ================== */}
//       <header className="bg-[#dc3545] text-white shadow-md fixed top-0 left-0 w-full z-50">
//         <div className="flex justify-between items-center px-4 py-3">
//           {/* Left: Logo + Deliver To */}
//           <div className="flex items-center space-x-2">
//             {icons.martlogo && (
//               <Image
//                 src={icons.martlogo}
//                 alt="Elegant Mart Logo"
//                 width={48}
//                 height={48}
//                 unoptimized
//                 className="h-10 md:h-12 w-auto"
//               />
//             )}

//             <button
//               onClick={() => setDeliverOpen(true)}
//               className="flex items-center space-x-1 hover:opacity-80 focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="w-5 h-5 text-white"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12 2.25c-3.728 0-6.75 2.94-6.75 6.563 0 4.335 6.75 12.937 6.75 12.937s6.75-8.602 6.75-12.937c0-3.623-3.022-6.563-6.75-6.563zm0 8.438a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <div className="flex flex-col leading-tight">
//                 <span className="text-sm">Deliver to ▼</span>
//                 <span className="text-xs text-gray-200 truncate w-28 md:w-32">
//                   560 block f Johar town, La...
//                 </span>
//               </div>
//             </button>
//           </div>

//           {/* Right: Login/Profile (Mobile) */}
//           <div className="md:hidden">
//             <Link href="/login">
//               {icons.profile && (
//                 <Image
//                   src={icons.profile}
//                   alt="Profile"
//                   width={36}
//                   height={36}
//                   className="w-9 h-9 rounded-full hover:opacity-80"
//                 />
//               )}
//             </Link>
//           </div>

//           {/* Middle: Search bar (desktop only) */}
//           <div className="hidden md:flex items-center flex-1 justify-center mx-4">
//             <div className="relative w-3/5">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full py-2 pl-10 pr-4 rounded-full bg-white focus:outline-none text-gray-800"
//               />
//               <div
//                 className="absolute left-3 top-2 text-gray-500 cursor-pointer hover:text-[#dc3545] transition-colors"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 &#9776;
//               </div>
//             </div>

//             {/* Wishlist Icon */}
//             <Link
//               href="/wishlist"
//               className="ml-4 flex items-center justify-center bg-white rounded-full w-10 h-10 hover:bg-gray-100 transition relative"
//             >
//               {icons.wishlist && (
//                 <Image
//                   src={icons.wishlist}
//                   alt="Wishlist"
//                   width={24}
//                   height={24}
//                   className="w-6 h-6 object-contain"
//                 />
//               )}
//               {wishlist && wishlist.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#dc3545] text-white text-xs rounded-full px-1.5">
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Right side: All Products, Cart, Login */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link href="/all-products" className="text-white font-semibold hover:text-gray-200">
//               All Products
//             </Link>

//             <Link href="/cart" className="relative">
//               {icons.cart && (
//                 <Image
//                   src={icons.cart}
//                   alt="Cart"
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full object-cover border border-gray-300"
//                 />
//               )}
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#dc3545] text-white text-xs rounded-full px-1.5">
//                   {cart.reduce((sum: number, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </Link>

//             <Link href="/login">
//               {icons.profile && (
//                 <Image
//                   src={icons.profile}
//                   alt="Profile"
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full hover:opacity-80"
//                 />
//               )}
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* ================== Delivery Popup ================== */}
//             {isDeliverOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//             onClick={() => setDeliverOpen(false)}
//           ></div>

//           {/* Popup Panel */}
//           <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
//               {/* Close Button */}
//               <button
//                 onClick={() => setDeliverOpen(false)}
//                 className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-[#dc3545]"
//               >
//                 &times;
//               </button>

//               {/* Logo */}
//               <div className="flex justify-center mb-4">
//                 {icons.martlogo ? (
//                   <Image
//                     src={icons.martlogo}
//                     alt="Elegant Mart Logo"
//                     width={120}
//                     height={40}
//                     className="h-10 md:h-12 w-auto"
//                   />
//                 ) : (
//                   <div className="h-10 md:h-12 w-auto bg-gray-200 rounded-md" />
//                 )}
//               </div>

//               {/* Heading */}
//               <h2 className="text-lg font-bold mb-3 text-gray-800 text-center">
//                 Select Delivery Area
//               </h2>

//               {/* Dropdown */}
//               <select
//                 className="text-black w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#dc3545] outline-none"
//                 defaultValue=""
//               >
//                 <option value="">Select Area / Sub Region</option>
//                 <option value="iqbal">Iqbal Avenue Phase 3</option>
//                 <option value="lda">LDA Avenue Phase 1</option>
//                 <option value="pd">P & D</option>
//                 <option value="nespak">Nespak Society</option>
//                 <option value="izmeer">Izmeer Society</option>
//               </select>

//               {/* Save Button */}
//               <button
//                 className="mt-4 w-full bg-[#dc3545] text-white font-semibold py-2 rounded-full hover:bg-[#b92c3a] transition-colors"
//                 onClick={() => setDeliverOpen(false)}
//               >
//                 Save Location
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//       {/* ================== Mobile Bottom Navbar ================== */}
//       {!isAdmin && (
//         <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg flex justify-around items-center py-3 md:hidden z-50">
//           {/* ... (mobile nav icons same as before) */}
//         </nav>
//       )}

//       {/* ================== Sidebar ================== */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>
//       )}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-lg font-bold text-gray-800">Categories</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-gray-600 text-2xl hover:text-[#dc3545]"
//           >
//             &times;
//           </button>
//         </div>
//         <ul className="p-4 space-y-4 text-gray-700">
//           {categories.length > 0 ? (
//             categories.map((cat) => (
//               <li key={cat.id}>
// <Link
//   href={`/${encodeURIComponent(cat.name.toLowerCase())}`}
//   className="block hover:text-[#dc3545] font-medium"
//   onClick={() => setSidebarOpen(false)}
// >
//   {cat.name}
// </Link>
//               </li>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">Loading categories...</p>
//           )}
//         </ul>
//       </div>

//       {/* ================== Search Overlay (Mobile) ================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20">
//           <div className="bg-white w-11/12 max-w-md rounded-lg shadow-lg p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-bold text-gray-800">Search</h2>
//               <button
//                 onClick={() => setSearchOpen(false)}
//                 className="text-gray-500 text-2xl hover:text-[#dc3545]"
//               >
//                 &times;
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Search for products..."
//               className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./context/CartContext";

interface Category {
  id: number;
  name: string;
}

interface Icons {
  martlogo?: string;
  profile?: string;
  home?: string;
  wishlist?: string;
  cart?: string;
}

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isDeliverOpen, setDeliverOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [icons, setIcons] = useState<Icons>({});
  const { cart } = useCart();

  // ✅ Fetch categories and icons dynamically
  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setIcons(data.icons || {});
      })
      .catch((err) => console.error("Error loading database:", err));
  }, []);

  return (
    <>
      {/* ✅ Navbar Header */}
      <header className="bg-[#dc3545] text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Left: Logo + Deliver To */}
          <div className="flex items-center space-x-2">
            {icons.martlogo && (
              <Image
                src={icons.martlogo}
                alt="Elegant Mart Logo"
                width={48}
                height={48}
                className="h-10 md:h-12 w-auto"
              />
            )}

            <button
              onClick={() => setDeliverOpen(true)}
              className="flex items-center space-x-1 hover:opacity-80 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-3.728 0-6.75 2.94-6.75 6.563 0 4.335 6.75 12.937 6.75 12.937s6.75-8.602 6.75-12.937c0-3.623-3.022-6.563-6.75-6.563zm0 8.438a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-sm">Deliver to ▼</span>
                <span className="text-xs text-gray-200 truncate w-28 md:w-32">
                  560 block f Johar town, La...
                </span>
              </div>
            </button>
          </div>

          {/* Right: Profile (Mobile only) */}
          <div className="md:hidden">
            <Link href="/login">
              {icons.profile && (
                <Image
                  src={icons.profile}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full hover:opacity-80"
                />
              )}
            </Link>
          </div>

          {/* Middle: Search bar (Desktop only) */}
          <div className="hidden md:flex items-center flex-1 justify-center mx-4">
            <div className="relative w-3/5">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 rounded-full bg-white focus:outline-none text-gray-800"
              />
              <div
                className="absolute left-3 top-2 text-gray-500 cursor-pointer hover:text-[#dc3545] transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                &#9776;
              </div>
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="ml-4 flex items-center justify-center bg-white rounded-full w-10 h-10 hover:bg-gray-100 transition"
            >
              {icons.wishlist && (
                <Image
                  src={icons.wishlist}
                  alt="Wishlist"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
            </Link>
          </div>

          {/* Right: Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/all-products"
              className="text-white font-semibold hover:text-gray-200"
            >
              All Products
            </Link>

            <Link href="/cart" className="relative">
              {icons.cart && (
                <Image
                  src={icons.cart}
                  alt="Cart"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border border-gray-300"
                />
              )}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#dc3545] text-white text-xs rounded-full px-1.5">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            <Link href="/login">
              {icons.profile && (
                <Image
                  src={icons.profile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full hover:opacity-80"
                />
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ✅ Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-200 flex justify-around items-center py-3 md:hidden z-50">
        {/* Categories */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="text-[11px]">Categories</span>
        </button>

        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
        >
          {icons.home && (
            <Image src={icons.home} alt="Home" width={24} height={24} className="mb-1" />
          )}
          <span className="text-[11px]">Home</span>
        </Link>

        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <span className="text-[11px]">Search</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
        >
          {icons.wishlist && (
            <Image
              src={icons.wishlist}
              alt="Wishlist"
              width={24}
              height={24}
              className="mb-1 object-contain"
            />
          )}
          <span className="text-[11px]">Wishlist</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors relative"
        >
          {icons.cart && (
            <Image src={icons.cart} alt="Cart" width={28} height={28} className="mb-1" />
          )}
          <span className="text-[11px]">Cart</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-2 bg-[#dc3545] text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>
      </nav>

      {/* ✅ Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ✅ Sidebar (Dynamic Categories) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Categories</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 text-2xl hover:text-[#dc3545]"
          >
            &times;
          </button>
        </div>

        <ul className="p-4 space-y-4 text-gray-700">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                  className="block hover:text-[#dc3545] font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Loading categories...</p>
          )}
        </ul>
      </div>

      {/* ✅ Deliver Popup */}
      {isDeliverOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setDeliverOpen(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setDeliverOpen(false)}
                className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-[#dc3545]"
              >
                &times;
              </button>

              <div className="flex justify-center mb-4">
                {icons.martlogo ? (
                  <Image
                    src={icons.martlogo}
                    alt="Elegant Mart Logo"
                    width={48}
                    height={48}
                    className="h-10 md:h-12 w-auto"
                  />
                ) : (
                  <div className="h-10 md:h-12 w-auto bg-gray-200 rounded-md" />
                )}
              </div>

              <h2 className="text-lg font-bold mb-3 text-gray-800 text-center">
                Select Delivery Area
              </h2>

              <select
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#dc3545] outline-none text-gray-700"
                defaultValue=""
              >
                <option value="">Select Area / Sub Region</option>
                <option value="iqbal">Iqbal Avenue Phase 3</option>
                <option value="lda">LDA Avenue Phase 1</option>
                <option value="pd">P & D</option>
                <option value="nespak">Nespak Society</option>
                <option value="izmeer">Izmeer Society</option>
              </select>

              <button
                className="mt-4 w-full bg-[#dc3545] text-white font-semibold py-2 rounded-full hover:bg-[#b92c3a] transition-colors"
                onClick={() => setDeliverOpen(false)}
              >
                Save Location
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ Search Popup */}
{isSearchOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={() => setSearchOpen(false)}
    ></div>

    <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setSearchOpen(false)}
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-[#dc3545]"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
          Search Products
        </h2>

        <input
          type="text"
          placeholder="Search for products..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#dc3545] outline-none text-gray-700"
        />

        <button
          onClick={() => setSearchOpen(false)}
          className="mt-4 w-full bg-[#dc3545] text-white font-semibold py-2 rounded-full hover:bg-[#b92c3a] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </>
)}

    </>

  );
}
