"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaEye, FaThumbsUp } from "react-icons/fa";

const PAGE_SIZE = 5;

const CategoryArticlesPage = () => {
  const { id: categoryId } = useParams();
  const router = useRouter();

  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await axios.get(`/api/v1/category/${categoryId}`);

        if (res.data.success && res.data.category) {
          setCategory(res.data.category);
          setArticles(res.data.articles || []);
          setTotalPages(Math.ceil((res.data.articles?.length || 0) / PAGE_SIZE));
          setStatus("success");
        } else {
          setError("Category or articles not found.");
          setStatus("error");
        }
      } catch {
        setError("Failed to load data. Please try again later.");
        setStatus("error");
      }
    };

    fetchData();
    setPage(1);
  }, [categoryId]);

  const displayedArticles = articles.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const truncateContent = (content, maxLines = 2) => {
    if (!content) return "";
    const lines = content.split("\n").slice(0, maxLines);
    return (
      lines.join(" ") + (content.split("\n").length > maxLines ? "..." : "")
    );
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Categories...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-4 border-l-4 border-red-500 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-5 font-inter">
      {/* Breadcrumb */}
      <header className="pb-5">
        <div className="">
          <nav className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <a
              href="/v1/category"
              className="hover:text-blue-600 transition-colors"
            >
              Categories
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">
              {category?.category}
            </span>
          </nav>
        </div>
      </header>

      {/* Category Info */}
      <h1 className="text-center mb-1 text-3xl sm:text-4xl font-semibold text-gray-900">
        {category.category}
      </h1>
      <p className="text-center text-gray-500 mb-3 max-w-xl mx-auto">
        {category.description || "No description provided."}
      </p>
      <p className="text-center text-gray-500 mb-8">
        Total Articles:{" "}
        <span className="font-semibold">{articles.length}</span>
      </p>

      {/* Articles */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No articles available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article) => (
            <div
              key={article._id}
              onClick={() => router.push(`/v1/articles/${article.slug}`)}
              className="cursor-pointer border border-gray-200 bg-white flex flex-col shadow hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
            >
              <div
                className="h-48 bg-cover bg-center border-b border-gray-200"
                style={{
                  backgroundImage: `url(${
                    article.featuredImage ||
                    "https://via.placeholder.com/600x300?text=No+Image"
                  })`,
                }}
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="mb-3 font-semibold text-lg text-gray-900">
                  {article.title}
                </h3>
                {article.content && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {truncateContent(article.content)}
                  </p>
                )}
                <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
                  <p>
                    {article.author || "Unknown Author"} •{" "}
                    {formatDate(article.createdAt)}
                  </p>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <FaThumbsUp /> {article.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye /> {article.views?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 border rounded ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 flex items-center justify-center border rounded ${
                  p === page
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 border rounded ${
              page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryArticlesPage;
