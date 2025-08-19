// src/app/404.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-gray-900">
      <h1 className="text-9xl font-extrabold text-indigo-600 mb-6">404</h1>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <FaArrowLeft /> Go Back
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-900 rounded-lg shadow hover:bg-gray-300 transition"
        >
          <FaHome /> Home
        </Link>
      </div>
    </div>
  );
}
