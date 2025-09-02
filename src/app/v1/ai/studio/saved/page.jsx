"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("/api/v1/ai/saved");
      if (res.data.success) {
        setArticles(res.data.articles);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setNotification({
        type: "error",
        message: "Failed to load articles",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchArticles();
    }
  }, [status]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCopyContent = () => {
    navigator.clipboard
      .writeText(selectedArticle.content)
      .then(() => {
        setNotification({
          type: "success",
          message: "Content copied to clipboard!",
        });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setNotification({
          type: "error",
          message: "Failed to copy content",
        });
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  // Extract metadata (like in AIWriter)
  const extractMeta = (content) => {
    if (!content) return { metaTitle: "", metaDescription: "", body: "" };

    const metaTitleMatch = content.match(/META_TITLE:\s*(.*)/i);
    const metaDescMatch = content.match(/META_DESCRIPTION:\s*(.*)/i);

    const metaTitle = metaTitleMatch ? metaTitleMatch[1].trim() : "";
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : "";

    const body = content
      .replace(/META_TITLE:\s*.*\n?/i, "")
      .replace(/META_DESCRIPTION:\s*.*\n?/i, "")
      .trim();

    return { metaTitle, metaDescription, body };
  };

  if (status === "loading" && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-gray-700">Loading your articles...</p>
        </div>
      </div>
    );
  }

   if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-gray-700">Unauthenticated User Spotted...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Kalamkunja — Saved Articles
          </h1>
          <div className="">
            <Link
              href="/v1/ai/studio"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow-md hover:bg-gray-800 transition-colors"
            >
              Back to Studio
            </Link>
          </div>
          <p className="mt-2 text-gray-600">
            Your collection of AI-generated, SEO-ready content
          </p>
        </header>

        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-md transition-all ${
              notification.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        {articles.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">You haven’t saved any articles yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((article) => {
              const { metaTitle, metaDescription } = extractMeta(
                article.content
              );
              return (
                <div
                  key={article._id}
                  className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {metaTitle || "Untitled Article"}
                    </h3>
                    {metaDescription && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {metaDescription}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedArticle && (
          <div className="fixed inset-0 bg-white-5 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
            <div className="bg-white border border-blue-600 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
              {(() => {
                const { metaTitle, metaDescription, body } = extractMeta(
                  selectedArticle.content
                );
                return (
                  <>
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {metaTitle || "Untitled Article"}
                      </h2>
                      {metaDescription && (
                        <p className="text-gray-600 text-sm">
                          {metaDescription}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs mt-1">
                        Created on{" "}
                        {new Date(
                          selectedArticle.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="p-6 overflow-y-auto flex-grow">
                      <div className="prose prose-sm sm:prose max-w-none text-gray-700">
                        {body.split("\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                      <button
                        onClick={handleCopyContent}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Copy Content
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
