'use client';

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";

interface Notification {
  title: string;
  message: string;
  audience: string;
  date: string;
}

interface FormData {
  title: string;
  message: string;
  audience: string;
}

export default function NotificationsPage() {
  const [form, setForm] = useState<FormData>({
    title: "",
    message: "",
    audience: "All Customers",
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      title: "Flash Sale",
      message: "Get 20% off on all dairy products today!",
      audience: "All Customers",
      date: "Sep 27, 2025",
    },
    {
      title: "Delivery Reminder",
      message: "Your order #1045 will arrive tomorrow.",
      audience: "Specific User",
      date: "Sep 26, 2025",
    },
    {
      title: "Inactive Customer Offer",
      message: "We miss you! Enjoy PKR 300 off your next purchase.",
      audience: "Inactive Customers",
      date: "Sep 24, 2025",
    },
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.message) {
      alert("Please fill all fields!");
      return;
    }

    const newNotification: Notification = {
      ...form,
      date: new Date().toLocaleDateString(),
    };
    setNotifications([newNotification, ...notifications]);
    setForm({ title: "", message: "", audience: "All Customers" });
  };

  const handleDelete = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Navbar */}
      <header className="bg-[#dc3545] text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Notifications & Communication</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, Admin</span>
          <Image
            src="/Images/Profile icon.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Sales", value: "Rs 1,200,000" },
            { label: "Orders", value: "2,340" },
            { label: "Customers", value: "1,120" },
            { label: "Products", value: "340" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-sm text-gray-500">{item.label}</h3>
              <p className="text-2xl font-bold text-[#dc3545]">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Total Notifications Sent</h3>
            <p className="text-2xl font-bold text-blue-600">1,245</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Promotional Campaigns</h3>
            <p className="text-2xl font-bold text-green-600">18</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Unread Customer Messages</h3>
            <p className="text-2xl font-bold text-red-600">32</p>
          </div>
        </div>

        {/* Send Notification Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Send Notification</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-800">Title</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter notification title"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Write notification message..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Audience</label>
              <select
                name="audience"
                value={form.audience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 shadow-sm"
              >
                <option>All Customers</option>
                <option>Active Customers</option>
                <option>Inactive Customers</option>
                <option>Specific User</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#c5303e] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
            >
              Send
            </button>
          </form>
        </div>

        {/* Recent Notifications Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Title</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Message</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Audience</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Date</th>
                <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {notifications.map((n, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 last:border-b-0">
                  <td className="p-3 border-b border-gray-100 align-top">{n.title}</td>
                  <td className="p-3 border-b border-gray-100 align-top">{n.message}</td>
                  <td className="p-3 border-b border-gray-100 align-top">{n.audience}</td>
                  <td className="p-3 border-b border-gray-100 align-top">{n.date}</td>
                  <td className="p-3 border-b border-gray-100 align-top space-x-2">
                    <button className="text-blue-600 hover:underline">View</button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
