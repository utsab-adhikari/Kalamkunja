"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FiSave, FiUpload, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";
import ImageUploader from "@/components/ImageUploader";
import toast from "react-hot-toast";

export default function UpdateArticle() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [articlE, setArticlE] = useState([]);
  const [slugEdited, setSlugEdited] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/api/v1/articles/${slug}`);
        if (res.data.success) {
          const article = res.data.article;
          setArticlE(res.data.article);
          setFormData({
            title: article.title,
            slug: article.slug,
            category: article.category,
            content: article.content,
            publishType: article.publishType || "draft",
          });
          setImageUrl(article.featuredImage || "");
        } else {
          setError(res.data.message || "Failed to load article");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Error fetching article"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Auto-generate slug from title if not edited
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

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const payload = {
        ...formData,
        authorId: session.user.id,
        featuredImage: imageUrl,
        id: articlE._id,
        author: session.user.name,
      };

      const res = await axios.put(`/api/v1/articles/${slug}`, payload);

      if (res.data.success) {
        setSuccess("Article updated successfully!");
        setTimeout(() => {
          router.push(`/v1/articles/${res.data.article.slug}`);
        }, 1500);
      } else {
        setError(res.data.message || "Failed to update article");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      console.error("Article update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Update Article
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
        <div className="mb-0">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-red-300 bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="article-url-slug"
            required
            disabled
          />
        </div>
        <p className="text-sm font-semibold mb-6 text-gray-400"> <i>You cannot change the slug directly</i></p>

        {/* Featured Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          />
        </div>

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
