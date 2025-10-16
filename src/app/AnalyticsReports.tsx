'use client';

import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import Image from "next/image";

Chart.register(...registerables);

export default function AnalyticsReports() {
  useEffect(() => {
    // Sales Chart (Line)
    const salesCtx = document.getElementById("salesChart") as HTMLCanvasElement | null;
    if (salesCtx) {
      // destroy previous instance if present
      const prev = Chart.getChart(salesCtx);
      if (prev) prev.destroy();

      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          datasets: [
            {
              label: "Sales (PKR)",
              data: [120000, 150000, 100000, 180000, 200000, 170000, 220000, 250000],
              borderColor: "#dc3545",
              backgroundColor: "rgba(220,53,69,0.2)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: "#1f2937" },
            },
          },
          scales: {
            x: {
              ticks: { color: "#1f2937" },
              grid: { color: "rgba(0,0,0,0.04)" },
            },
            y: {
              ticks: { color: "#1f2937" },
              grid: { color: "rgba(0,0,0,0.04)" },
            },
          },
        },
      });
    }

    // Orders Chart (Pie)
    const ordersCtx = document.getElementById("ordersChart") as HTMLCanvasElement | null;
    if (ordersCtx) {
      const prev = Chart.getChart(ordersCtx);
      if (prev) prev.destroy();

      new Chart(ordersCtx, {
        type: "pie",
        data: {
          labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
          datasets: [
            {
              data: [120, 300, 900, 50],
              backgroundColor: ["#fbbf24", "#3b82f6", "#22c55e", "#ef4444"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { labels: { color: "#1f2937" } },
          },
        },
      });
    }

    // Payment Methods Chart (Doughnut)
    const paymentCtx = document.getElementById("paymentChart") as HTMLCanvasElement | null;
    if (paymentCtx) {
      const prev = Chart.getChart(paymentCtx);
      if (prev) prev.destroy();

      new Chart(paymentCtx, {
        type: "doughnut",
        data: {
          labels: ["Cash", "Credit Card", "Easypaisa", "JazzCash"],
          datasets: [
            {
              data: [500, 800, 700, 300],
              backgroundColor: ["#f97316", "#2563eb", "#16a34a", "#9333ea"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { labels: { color: "#1f2937" } },
          },
        },
      });
    }

    // cleanup
    return () => {
      const elSales = document.getElementById("salesChart") as HTMLCanvasElement | null;
      if (elSales) {
        const ch = Chart.getChart(elSales);
        if (ch) ch.destroy();
      }
      const elOrders = document.getElementById("ordersChart") as HTMLCanvasElement | null;
      if (elOrders) {
        const ch = Chart.getChart(elOrders);
        if (ch) ch.destroy();
      }
      const elPayment = document.getElementById("paymentChart") as HTMLCanvasElement | null;
      if (elPayment) {
        const ch = Chart.getChart(elPayment);
        if (ch) ch.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#dc3545] text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Analytics & Reports</h1>
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
      <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Sales", value: "Rs 1,200,000" },
            { label: "Orders", value: "2,340" },
            { label: "Customers", value: "1,120" },
            { label: "Products", value: "340" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-sm text-gray-500">{stat.label}</h3>
              <p className="text-2xl font-bold text-[#dc3545]">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-green-600">PKR 1,250,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">4,520</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Active Customers</h3>
            <p className="text-2xl font-bold text-purple-600">1,240</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Top Category</h3>
            <p className="text-2xl font-bold text-orange-600">Vegetables</p>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <div className="h-64">
              <canvas id="salesChart" />
            </div>
        </div>

        {/* Orders & Payment Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Orders by Status</h2>
            <div className="h-64">
              <canvas id="ordersChart" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Payments Breakdown</h2>
            <div className="h-64">
              <canvas id="paymentChart" />
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-black">Top 5 Best-Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Product</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Category</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Units Sold</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Revenue</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  { product: "Tomatoes", category: "Vegetables", sold: "1,200", revenue: "PKR 240,000" },
                  { product: "Milk", category: "Dairy", sold: "950", revenue: "PKR 190,000" },
                  { product: "Rice", category: "Grains", sold: "800", revenue: "PKR 400,000" },
                  { product: "Chicken", category: "Meat", sold: "700", revenue: "PKR 560,000" },
                  { product: "Onions", category: "Vegetables", sold: "650", revenue: "PKR 130,000" },
                ].map((item, i) => (
                  <tr key={i} className="bg-white hover:bg-gray-50 last:border-b-0">
                    <td className="p-3 border-b border-gray-100 align-top">{item.product}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{item.category}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{item.sold}</td>
                    <td className="p-3 border-b border-gray-100 align-top">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
