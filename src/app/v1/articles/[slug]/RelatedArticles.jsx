import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RelatedArticles = ({ catid, id }) => {
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    let isMounted = true; // prevent updates after unmount

    if (!catid) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/category/${catid}`);

        if (isMounted) {
          if (res.data.success && res.data.articles) {
            setCategory(res.data.category);

            // remove duplicates + exclude current article
            const filtered = res.data.articles
              .filter(
                (item, idx, arr) =>
                  arr.findIndex((a) => a._id === item._id) === idx
              )
              .filter((item) => item._id !== id);

            setArticles(filtered);
          } else {
            toast.error(res.data.message || "Failed to load related articles");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error(error?.message || "Error loading related articles");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, [catid, id]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading related articles...</span>
      </div>
    );
  }

  if (!articles.length) {
    return null; // render nothing if no related articles
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Articles
      </h2>
      <div className="flex flex-col">
        {articles.map((item) => (
          <Link
          href={`/v1/articles/${item.slug}`}
            key={item._id}
            className="flex flex-col bg-white mb-3 border p-2 shadow-sm hover:shadow-md"
          >
            <div className="flex">
              <img
                src={item.featuredImage || "https://via.placeholder.com/150"}
                alt={item.title}
                className="bg-gray-200 border-2 border-dashed border-gray-300 h-auto w-30 flex-shrink-0"
              />
              <div className="p-5 pt-0 flex-1">
                <h3 className="font-bold text-lg mt-1 mb-2 text-gray-900 leading-snug hover:text-blue-700 cursor-pointer">
                  {item.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 justify-between">
                  <span>{formatDate(item.createdAt)}</span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-200 px-1 py-0.5 rounded-md">
                    {category?.category || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
            {item.content && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 pt-1">
                {truncateContent(item.content)}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
