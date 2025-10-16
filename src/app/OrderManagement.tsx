"use client";

import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: string;
  amount: string;
  payment: string;
  status: string;
}

export default function OrderManagement() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  const orders: Order[] = [
    {
      id: "#1023",
      customer: "Ali Khan",
      date: "Sep 25, 2025",
      items: "Tomato, Onion",
      amount: "Rs 450",
      payment: "COD",
      status: "Pending",
    },
    {
      id: "#1024",
      customer: "Sara Malik",
      date: "Sep 26, 2025",
      items: "Milk, Bread",
      amount: "Rs 350",
      payment: "Card",
      status: "Delivered",
    },
    {
      id: "#1025",
      customer: "Ahmed Raza",
      date: "Sep 27, 2025",
      items: "Chicken, Rice",
      amount: "Rs 1200",
      payment: "Wallet",
      status: "Shipped",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesSearch = Object.values(order)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* 🔺 Top Navbar */}
      <header className="bg-[#dc3545] text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Order Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, Admin</span>
          {/* Replace <img> with <Image> for optimization if you want */}
          <img
            src="/Images/Profile icon.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </header>

      {/* 📊 Content */}
      <main className="flex-1 p-6">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-500">25</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Shipped Orders</h3>
            <p className="text-2xl font-bold text-blue-500">40</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Delivered Orders</h3>
            <p className="text-2xl font-bold text-green-500">320</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Cancelled Orders</h3>
            <p className="text-2xl font-bold text-red-500">12</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search orders..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg mb-3 md:mb-0"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Order ID</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Customer</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Date</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Items</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Amount</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Payment</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Status</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr key={i} className="bg-white hover:bg-gray-50 last:border-b-0">
                    <td className="p-3 border-b border-gray-100 align-top">{order.id}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{order.customer}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{order.date}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{order.items}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{order.amount}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{order.payment}</td>
                    <td className="p-3 border-b border-gray-100 align-top">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border-b border-gray-100 align-top space-x-1">
                      <button className="text-blue-600 hover:underline">View</button>
                      <span className="mx-1 text-gray-300">|</span>
                      <button className="text-green-600 hover:underline">Update</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-4 text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
