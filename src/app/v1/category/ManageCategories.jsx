"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const { data: session, status } = useSession();

  // Fetch existing categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/v1/category");

      if (res.data.success) {
        setCategories(res.data.categories || []);
      } else {
        setError(res.data.message || "Failed to load categories");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post("/api/v1/category", formData);

      if (res.data.success) {
        setSuccess("Category created successfully!");
        setCategories((prev) => [...prev, res.data.category]);
        setFormData({ category: "", description: "" });
      } else {
        setError(res.data.message || "Failed to create category");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !id ||
      !window.confirm("Are you sure you want to delete this category?")
    ) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const res = await axios.delete("/api/v1/category", {
        data: { id },
      });

      if (res.data.success) {
        setSuccess("Category deleted successfully!");
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        setError(res.data.message || "Failed to delete category");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Categories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {session && session?.user?.role === "admin" && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Create Category Form */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Create New Category
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-200">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Category Name *
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technology, Health"
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a brief description"
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiPlus className="mr-2" />
                {loading ? "Creating..." : "Create Category"}
              </button>
            </form>
          </div>

          {/* Existing Categories List */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Existing Categories
              </h2>
              <button
                onClick={fetchCategories}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                disabled={loading}
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No categories found</p>
                <p className="mt-2">
                  Create your first category using the form
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((cat) => (
                      <tr key={cat._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {cat.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                          {cat.description || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                              title="Edit"
                            >
                              <FiEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(cat._id)}
                              disabled={deletingId === cat._id}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === cat._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></div>
                              ) : (
                                <FiTrash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/v1/category/${cat._id}`}
              className="block p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition duration-200"
            >
              <h2 className="text-lg font-semibold text-blue-600">
                {cat.category}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {cat.description || "No description available"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
