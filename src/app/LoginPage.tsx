'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data:", formData);
    alert("Login submitted! (You can integrate backend later)");
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-12 my-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 pop-out">
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <Image
            src="/Images/martlogo.jpg"
            alt="Elegant Mart Logo"
            width={120}
            height={120}
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold text-[#dc3545]">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Login to continue your shopping</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
{/* Email */}
<div className="floating-label relative text-gray-700">
  <input
    type="email"
    id="email"
    name="email"
    placeholder=" "
    required
    value={formData.email}
    onChange={handleChange}
    className="peer w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-2 text-gray-500 text-sm transition-all
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#dc3545]
      peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#dc3545]"
  >
    Email Address
  </label>
</div>

{/* Password */}
<div className="floating-label relative text-gray-700">
  <input
    type="password"
    id="password"
    name="password"
    placeholder=" "
    required
    value={formData.password}
    onChange={handleChange}
    className="peer w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
  />
  <label
    htmlFor="password"
    className="absolute left-4 top-2 text-gray-500 text-sm transition-all
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#dc3545]
      peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#dc3545]"
  >
    Password
  </label>
</div>


          {/* Remember Me + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="rounded text-[#dc3545] focus:ring-[#dc3545]"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <Link href="#" className="text-[#dc3545] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#dc3545] text-white py-3 rounded-lg font-medium 
            hover:bg-white hover:text-[#dc3545] hover:border hover:border-[#dc3545] transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-3 justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <Image
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="Google"
              width={24}
              height={24}
            />
            <span className="text-sm text-gray-700">Google</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <Image
              src="https://img.icons8.com/ios-filled/24/1877F2/facebook-new.png"
              alt="Facebook"
              width={24}
              height={24}
            />
            <span className="text-sm text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#dc3545] hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
