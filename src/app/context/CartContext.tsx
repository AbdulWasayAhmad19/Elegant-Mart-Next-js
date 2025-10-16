// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// // 🧾 Define Product and Cart Item types
// export interface Product {
//   id: number | string;
//   name: string;
//   price: number;
//   image?: string;
//   unit?: string;
// }

// export interface CartItem extends Product {
//   quantity: number;
// }

// // 🛍️ Define Cart Context type
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (name: string) => void;
//   updateQuantity: (name: string, change: number) => void;
//   subtotal: number;
// }

// // 🧠 Create Context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // 🧩 Provider Component
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const savedCart = localStorage.getItem("cartData");
//         return savedCart ? JSON.parse(savedCart) : [];
//       } catch (e) {
//         console.error("Failed to parse cartData from localStorage", e);
//         return [];
//       }
//     }
//     return [];
//   });

//   // 💾 Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         localStorage.setItem("cartData", JSON.stringify(cart));
//       } catch (e) {
//         console.error("Failed to save cartData to localStorage", e);
//       }
//     }
//   }, [cart]);

//   // ➕ Add item to cart
//   const addToCart = (product: Product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.name === product.name);
//       if (existing) {
//         return prev.map((item) =>
//           item.name === product.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   // ➖ Remove item from cart
//   const removeFromCart = (name: string) => {
//     setCart((prev) => prev.filter((item) => item.name !== name));
//   };

//   // 🔢 Update quantity (increase or decrease)
//   const updateQuantity = (name: string, change: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.name === name
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   // 💰 Calculate subtotal
//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, subtotal }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // 🧩 Custom hook
// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 🧾 Define Product and Cart Item types
export interface Product {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  unit?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// 🛍️ Define Cart Context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, change: number) => void;
  subtotal: number;
}

// 🧠 Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 🧩 Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cartData");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (e) {
        console.error("❌ Failed to parse cartData from localStorage:", e);
        return [];
      }
    }
    return [];
  });

  // 💾 Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartData", JSON.stringify(cart));
      } catch (e) {
        console.error("❌ Failed to save cartData to localStorage:", e);
      }
    }
  }, [cart]);

  // ➕ Add item to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ Remove item from cart
  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // 🔢 Update quantity (increase or decrease)
  const updateQuantity = (name: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        // 🧹 Filter out any accidental zero-quantity items
        .filter((item) => item.quantity > 0)
    );
  };

  // 💰 Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🧩 Custom hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
