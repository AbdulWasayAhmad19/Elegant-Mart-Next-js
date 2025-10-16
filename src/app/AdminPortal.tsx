"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart,
  Bell,
  LogOut,
  X,
} from "lucide-react";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  link: string;
};

export default function AdminPortal(): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const menuItems: MenuItem[] = [
    { icon: <Package size={20} />, label: "Products", link: "/admin/products" },
    { icon: <ShoppingCart size={20} />, label: "Orders", link: "/admin/orders" },
    { icon: <Users size={20} />, label: "Customers", link: "/admin/customers" },
    { icon: <CreditCard size={20} />, label: "Payments", link: "/admin/payments" },
    { icon: <BarChart size={20} />, label: "Analytics", link: "/admin/analytics" },
    { icon: <Bell size={20} />, label: "Notifications", link: "/admin/notifications" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-[#dc3545] text-white flex flex-col justify-between`}
      >
        <div>
          {/* Header with close icon (for mobile) */}
          <div className="flex justify-between items-center p-6 border-b border-[#b72b3a]">
            <h2 className="text-2xl font-bold">Admin Portal</h2>
            <button
              onClick={closeSidebar}
              className="md:hidden text-white text-2xl focus:outline-none"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                onClick={closeSidebar}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#b72b3a] transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="p-4 border-t border-[#b72b3a]">
          <button className="w-full flex items-center justify-center space-x-2 bg-white text-[#dc3545] font-semibold py-2 rounded-md hover:bg-gray-100 transition">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow rounded-lg p-4 flex justify-between items-center mb-6">
          {/* Hamburger for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl text-[#dc3545] focus:outline-none"
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>

          <div className="flex items-center space-x-4">
            <img
              src="/Images/Profile icon.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Sales", value: "Rs 1,200,000" },
            { title: "Orders", value: "2,340" },
            { title: "Customers", value: "1,120" },
            { title: "Products", value: "340" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-sm text-gray-500">{item.title}</h3>
              <p className="text-2xl font-bold text-[#dc3545]">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Dashboard Sections with Links */}
        {[
          {
            title: "📦 Product & Inventory Management",
            desc: "Manage your products and inventory here.",
            link: "/admin/products",
          },
          {
            title: "🛒 Order Management",
            desc: "View and update order statuses (Pending, Shipped, Delivered).",
            link: "/admin/orders",
          },
          {
            title: "👤 Customer Management",
            desc: "Track customers, view purchase history, manage accounts.",
            link: "/admin/customers",
          },
          {
            title: "💳 Payment & Transactions",
            desc: "View payment history, refunds, and method usage (COD, card, wallet).",
            link: "/admin/payments",
          },
          {
            title: "📊 Analytics & Reports",
            desc: "Generate sales reports, top-selling products, and customer insights.",
            link: "/admin/analytics",
          },
          {
            title: "🔔 Notifications & Communication",
            desc: "Send updates to customers (SMS, Email, App notifications).",
            link: "/admin/notifications",
          },
        ].map((section, i) => (
          <section
            key={i}
            className="bg-white p-6 rounded-lg shadow mb-8 hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={section.link} className="block">
              <h2 className="text-lg font-bold mb-2 text-[#dc3545] hover:underline">
                {section.title}
              </h2>
              <p className="text-gray-600">{section.desc}</p>
            </Link>
          </section>
        ))}
      </main>
    </div>
  );
}
