"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiSave, FiUpload, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";
import ImageUploader from "@/components/ImageUploader";

export default function CreateArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [slugEdited, setSlugEdited] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data: session, status } = useSession();
  const [user, setUser] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    content: "",
    publishType: "draft",
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/v1/category");
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, slugEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "slug") {
      setSlugEdited(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!session.user || !session.user.id) {
        throw new Error("User not authenticated");
      }

      const payload = {
        ...formData,
        authorId: session.user.id,
        featuredImage: imageUrl,
        author: session.user.name,
      };

      const res = await axios.post("/api/v1/articles/create", payload);

      if (res.data.success) {
        setSuccess(res.data.message);
        setTimeout(() => {
          router.push(`/v1/articles/${res.data.article.slug}`);
        }, 1500);
      } else {
        setError(res.data.message || "Failed to create article");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      console.error("Article creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Create New Article
        </h1>
        <button
          onClick={() => router.push("/")}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <FiX className="mr-1" /> Cancel
        </button>
      </div>

      {(error || success) && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            error
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {error || success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6"
      >
        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter article title"
            required
            disabled={loading}
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL Slug *
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              /articles/
            </span>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="article-url-slug"
              required
              disabled={loading}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            This will be the article's URL. Use hyphens instead of spaces.
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-6">
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Featured Image
          </label>
          <ImageUploader onUpload={handleImageUpload} />

          {imageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <div className="border rounded-md overflow-hidden max-w-xs">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                list="categoriesList"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Select or create category"
                required
                disabled={loading}
              />
              <datalist id="categoriesList">
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.category} />
                ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 3).map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category: cat.category,
                      }))
                    }
                    className={`px-3 py-1 text-sm rounded-full ${
                      formData.category === cat.category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your article content here..."
            required
            disabled={loading}
          ></textarea>
        </div>

        {/* Publish Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publish Status
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="publishType"
                value="draft"
                checked={formData.publishType === "draft"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-2 flex items-center">
                <FiSave className="mr-1" /> Save as Draft
              </span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="publishType"
                value="published"
                checked={formData.publishType === "published"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-2 flex items-center">
                <FiUpload className="mr-1" /> Publish Now
              </span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            name="publishType"
            value="draft"
            onClick={() =>
              setFormData((prev) => ({ ...prev, publishType: "draft" }))
            }
            disabled={loading}
            className={`flex items-center px-5 py-2.5 rounded-md ${
              loading ? "bg-gray-300" : "bg-gray-600 hover:bg-gray-700"
            } text-white transition`}
          >
            <FiSave className="mr-2" />
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="submit"
            name="publishType"
            value="published"
            onClick={() =>
              setFormData((prev) => ({ ...prev, publishType: "published" }))
            }
            disabled={loading}
            className={`flex items-center px-5 py-2.5 rounded-md ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white transition`}
          >
            <FiUpload className="mr-2" />
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
