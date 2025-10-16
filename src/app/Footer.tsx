"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Icons {
  martlogo?: string;
  profile?: string;
  wishlist?: string;
  home?: string;
  cart?: string;
  [key: string]: string | undefined;
}

export default function Footer() {
  const [icons, setIcons] = useState<Icons>({});
  const year = new Date().getFullYear();

  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => setIcons(data.icons || {}))
      .catch((err) => console.error("Error loading database:", err));
  }, []);

  return (
    <footer className="bg-[#dc3545] text-white py-10 mt-0 border-t-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {icons.martlogo && (
              <Image
                src={icons.martlogo}
                alt="Elegant Mart Logo"
                width={160}
                height={80}
                unoptimized
                className="mb-4 drop-shadow-lg"
              />
            )}
            <p className="text-sm opacity-80">Your trusted shopping partner</p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3">Contact Us</h3>
            <p>
              WhatsApp: <a href="tel:+9230086899485" className="font-semibold">0300-86899485</a>
            </p>
            <p>
              Email: <a href="mailto:elegant@gmail.com" className="font-semibold">elegant@gmail.com</a>
            </p>
            <p>Address: Iqbal Avenue Phase 3, Block C, Lahore</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200 transition">Home</a></li>
              <li><a href="/all-products" className="hover:text-gray-200 transition">Products</a></li>
              <li><a href="/categories" className="hover:text-gray-200 transition">Categories</a></li>
              <li><a href="/contact" className="hover:text-gray-200 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3">Follow Us</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" aria-label="Facebook" className="inline-block">
                <Image src="/social/facebook-white.png" alt="Facebook" width={28} height={28} />
              </a>
              <a href="#" aria-label="Instagram" className="inline-block">
                <Image src="/social/instagram-white.png" alt="Instagram" width={28} height={28} />
              </a>
              <a href="#" aria-label="Twitter" className="inline-block">
                <Image src="/social/twitter-white.png" alt="Twitter" width={28} height={28} />
              </a>
              <a href="#" aria-label="WhatsApp" className="inline-block">
                <Image src="/social/whatsapp-white.png" alt="WhatsApp" width={28} height={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-4 text-center text-sm opacity-80">
          © {year} Elegant Mart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
