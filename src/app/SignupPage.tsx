'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup data:", formData);
    alert("Signup successful! (Integrate backend later)");
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12 my-10">
      <div className="bg-white shadow-xl rounded-2xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left: Illustration / Logo */}
        <div className="bg-[#dc3545] hidden md:flex flex-col items-center justify-center text-white p-8">
          <Image
            src="/Images/martlogo.jpg"
            alt="Elegant Mart Logo"
            width={130}
            height={130}
            className="mb-6 drop-shadow-lg"
          />
          <h2 className="text-3xl font-bold">Join Elegant Mart</h2>
          <p className="mt-3 text-sm opacity-90">
            Create your account and start shopping with style 🚀
          </p>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7usPFq-FWuTvtXMpPstBqIdLRSWGlII7vQ&s"
            alt="Grocery Items Illustration"
            width={300}
            height={200}
            className="mt-6 rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#dc3545] text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign up to continue your shopping experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="floating-label text-gray-700">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              />
              <label htmlFor="name ">Full Name</label>
            </div>

            {/* Email */}
            <div className="floating-label text-gray-700">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              />
              <label htmlFor="email">Email Address</label>
            </div>

            {/* Password */}
            <div className="floating-label text-gray-700">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              />
              <label htmlFor="password">Password</label>
            </div>

            {/* Confirm Password */}
            <div className="floating-label text-gray-700">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#dc3545] text-white py-3 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-[#dc3545] hover:to-[#ff6b6b]"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Signup */}
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

          {/* Login Link */}
          <p className="text-center text-sm mt-6 text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#dc3545] hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
