"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number | string;
  name: string;
  image?: string;
}

interface Product {
  id: number | string;
  name: string;
  category?: string;
  type?: string;
  sizes?: string;
  image?: string;
  price?: number | string;
}

export default function ProductsInventory() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const toggleCategoryForm = () => setShowCategoryForm((prev) => !prev);
  const toggleProductForm = () => setShowProductForm((prev) => !prev);

  // Fetch categories & products from /database.json
  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setProducts(data.products || []);
      })
      .catch((err) => console.error("Failed to load database.json", err));
  }, []);

  // Local-only add functions (no persistence)
  const addCategory = (name: string, image?: string) => {
    const newCat: Category = { id: Date.now(), name, image };
    setCategories((s) => [newCat, ...s]);
  };

  const addProduct = (p: Product) => {
    // If the incoming product already has an id, keep it; otherwise generate one.
    const { id, ...rest } = p as Partial<Product> & Product;
    const newP: Product = { id: id ?? Date.now(), ...rest };
    setProducts((s) => [newP, ...s]);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-[#dc3545] text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Products & Inventory Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, Admin</span>
          <img
            src="/Images/Profile icon.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {[
    { title: "Total Sales", value: "Rs 1,200,000" },
    { title: "Orders", value: "2,340" },
    { title: "Products", value: `${products.length}` },
    { title: "Categories", value: `${categories.length}` },
  ].map((stat, i) => (
    <div
      key={i}
      className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition"
    >
      <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
      <p className="text-2xl font-bold text-[#dc3545]">{stat.value}</p>
    </div>
  ))}
</section>


        {/* ================= CATEGORY MANAGEMENT ================= */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Manage Categories</h2>
            <button
              onClick={toggleCategoryForm}
              className="bg-[#dc3545] text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              + Add Category
            </button>
          </div>

          {/* Category Form */}
{showCategoryForm && (
  <div className="bg-white p-6 rounded-xl shadow-md mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Create / Edit Category
    </h3>
    <form
      className="space-y-4 text-gray-800"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("categoryName") as HTMLInputElement).value;
        addCategory(name);
        form.reset();
        setShowCategoryForm(false);
      }}
    >
      <input
        name="categoryName"
        type="text"
        placeholder="Category Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="file"
        accept="image/*"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={toggleCategoryForm}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}


          {/* Category Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {categories.map((cat, i) => (
    <div
      key={cat.id ?? i}
      className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
    >
      <img
        src={cat.image || "/Images/placeholder.png"}
        alt={cat.name}
        className="h-40 w-full object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg text-gray-800 mb-3 truncate w-full">
        {cat.name}
      </h3>
      <div className="flex justify-center space-x-5">
        <button className="text-blue-600 font-medium hover:underline">Edit</button>
        <button
          className="text-red-600 font-medium hover:underline"
          onClick={() => setCategories((s) => s.filter((c) => c.id !== cat.id))}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        </section>

        {/* ================= PRODUCT MANAGEMENT ================= */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Manage Products</h2>
            <button
              onClick={toggleProductForm}
              className="bg-[#dc3545] text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              + Add Product
            </button>
          </div>

          {/* Product Form */}
          {showProductForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-md font-bold mb-3">Add / Edit Product</h3>
              <form className="space-y-4">
                <select className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="">Select Category</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy</option>
                </select>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Product Type (e.g., Organic, Frozen)"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Available Sizes (e.g., 1kg, 500g)"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={toggleProductForm}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600 text-left">Image</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Name</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Category</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Type</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Sizes</th>
                  <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="bg-white hover:bg-gray-50 last:border-b-0">
                      <td className="p-3 border-b border-gray-100 align-top">
                        <img
                          src={p.image || "/Images/placeholder.png"}
                          alt={p.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-3 border-b border-gray-100 align-top">{p.name}</td>
                      <td className="p-3 border-b border-gray-100 align-top">{p.category || "-"}</td>
                      <td className="p-3 border-b border-gray-100 align-top">{p.type || "-"}</td>
                      <td className="p-3 border-b border-gray-100 align-top">{p.sizes || "-"}</td>
                      <td className="p-3 border-b border-gray-100 align-top">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => {
                            // Edit flow: prefill form or open modal (not implemented)
                            console.log("Edit product", p.id);
                          }}
                        >
                          Edit
                        </button>
                        <span className="mx-2 text-gray-300">|</span>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => setProducts((s) => s.filter((item) => item.id !== p.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
