"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    async function fetchAuthors() {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/authors");
        const allAuthors = res.data.users.filter(
          (user) => user.profile === true
        );
        // Paginate on frontend:
        const startIndex = (page - 1) * limit;
        const paginatedAuthors = allAuthors.slice(
          startIndex,
          startIndex + limit
        );
        setAuthors(paginatedAuthors);
      } catch (err) {
        console.error("Failed to load authors", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthors();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Authors...</p>
      </div>
    );
  }

  if (authors.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-600 text-lg">No authors found.</p>
      </div>
    );
  }

  // Calculate total pages from filtered authors count (you could store count outside useEffect if you want)
  const totalAuthors = authors.length;
  const totalPages = Math.ceil(totalAuthors / limit);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Authors</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Link
            key={author._id}
            href={`/v1/profile/${author.email}`}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col"
            style={{ borderRadius: 0 }} // sharp edges
          >
            <img
              src={
                author.featuredImage ||
                "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png"
              }
              alt={author.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              {author.name}
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              {author.followers.length || 0} Followers
            </p>

            <p className="text-gray-700 flex-grow">
              {author.bio || "No bio available"}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 disabled:opacity-50"
          style={{ borderRadius: 0 }}
        >
          Prev
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          disabled={authors.length < limit}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          style={{ borderRadius: 0 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
