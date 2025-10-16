"use client";

import React from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
};

export default Providers;
