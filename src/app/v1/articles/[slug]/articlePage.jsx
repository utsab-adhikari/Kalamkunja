"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiCalendar,
  FiUser,
  FiFolder,
  FiEye,
  FiHeart,
  FiShare2,
  FiX,
} from "react-icons/fi"; // Added FiX import
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
  FaEdit,
} from "react-icons/fa";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import RelatedArticles from "./RelatedArticles";
import ArticleSummarizer from "./ArticleSummarizer";

export default function ArticleDetails({ slug }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false); // State to prevent multiple like requests
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session, status } = useSession();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/articles/${slug}`);

        if (res.data.success) {
          setArticle(res.data.article);
          setAuthor(res.data.author);
          setLiked(
            res.data.article.likedBy?.includes(session?.user?.id) || false
          );

          recordView(res.data.article.slug);
        } else {
          setError(res.data.message || "Article not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (article && session?.user?.id) {
      setLiked(article.likedBy?.includes(session.user.id));
    }
  }, [article, session]);

  const recordView = async (slug) => {
    try {
      const viewerId = session?.user?.id || null;
      const ipAddress = await getIPAddress();

      await axios.post(`/api/v1/articles/${slug}/view`, {
        viewerId,
        ipAddress,
      });

      // Optimistic UI update: increment views count locally
      setArticle((prev) => ({
        ...prev,
        views: [...(prev.views || []), { viewerId, ipAddress }], // or just increase length count
      }));
    } catch (err) {
      console.error("Failed to record view:", err);
    }
  };

  const getIPAddress = async () => {
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      return res.data.ip;
    } catch {
      return "unknown";
    }
  };

  const handleLike = async () => {
    if (!article || liking) return;

    setLiking(true);
    const previousLikedState = liked;
    setLiked((prev) => !prev);
    setArticle((prev) => ({
      ...prev,
      likes: prev.likes + (previousLikedState ? -1 : 1),
    }));

    try {
      const userId = session.user.id || "guest"; // Ensure userId is available

      const res = await axios.post(`/api/v1/articles/${slug}/like`, {
        userId,
      });

      if (res.data.success) {
        // Update state with actual data from server response
        setLiked(res.data.liked);
        setArticle((prev) => ({
          ...prev,
          likes: res.data.likes,
          likedBy: res.data.likedBy, // Ensure likedBy array is updated from server
        }));
      } else {
        // If API call fails, revert the UI to its previous state
        setLiked(previousLikedState);
        setArticle((prev) => ({
          ...prev,
          likes: prev.likes + (previousLikedState ? 1 : -1), // Revert like count
        }));
        console.error("Like action failed on server:", res.data.message);
      }
    } catch (err) {
      console.error("Like action failed due to network or server error:", err);
      // Revert the UI to its previous state on error
      setLiked(previousLikedState);
      setArticle((prev) => ({
        ...prev,
        likes: prev.likes + (previousLikedState ? 1 : -1), // Revert like count
      }));
    } finally {
      setLiking(false); // Reset liking state
    }
  };

  // Copy article link to clipboard
  const copyLink = () => {
    // Using document.execCommand('copy') for better compatibility in iframe environments
    const el = document.createElement("textarea");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  // Format date string to a readable format
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Loading state UI
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading article...</p>
      </div>
    );
  }

  // Error or article not found state UI
  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Article Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 py-6">
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <a
              href="/v1/articles"
              className="hover:text-blue-600 transition-colors"
            >
              Articles
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">
              {article.category}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <FiUser className="mr-2 text-blue-500" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-blue-500" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <FiFolder className="mr-2 text-blue-500" />
              <a
                href={`/category/${article.category.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
              >
                {article.category}
              </a>
            </div>
            <div className="flex items-center">
              <FiEye className="mr-2 text-blue-500" />
              <span>{article.views?.length || 0} views</span>
            </div>

            {session?.user?.id === article?.authorId && (
              <Link
                href={`/v1/articles/update/${slug}`}
                className="flex items-center border px-2 rounded-sm bg-green-200 border-green-600"
              >
                <FaEdit className="mr-2 text-blue-500" />
                Edit
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="flex md:flex-nowrap flex-wrap">
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Featured Image */}
          <div className="overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              width={1200}
              height={630}
              className="w-full max-h-60 object-cover"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none py-6 leading-relaxed text-gray-800 whitespace-pre-wrap">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>

          {/* Article Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={handleLike}
                disabled={liking || status !== "authenticated"} // Disable button while liking request is in progress
                className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ease-in-out
                ${
                  liked
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
                ${
                  liking
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }
              `}
                aria-label={liked ? "Unlike article" : "Like article"}
              >
                <FiHeart
                  className={`mr-2 ${liked ? "fill-current text-red-600" : ""}`}
                />
                <span>
                  {article.likes} {article.likes === 1 ? "Like" : "Likes"}
                </span>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition hover:scale-105 active:scale-95"
                aria-expanded={showShare}
                aria-controls="share-options"
              >
                <FiShare2 className="mr-2" />
                <span>Share</span>
              </button>

              {showShare && (
                <div
                  id="share-options"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl p-4 z-10 border border-gray-200 animate-fade-in"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Share this article
                    </h3>
                    <button
                      onClick={() => setShowShare(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                      aria-label="Close share options"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF size={16} />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter size={16} />
                    </a>

                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        window.location.href
                      )}&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn size={16} />
                    </a>

                    <button
                      onClick={copyLink}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        copied ? "bg-green-600" : "bg-gray-600"
                      } text-white transition-colors shadow-md hover:shadow-lg hover:bg-gray-700`}
                      aria-label="Copy link to clipboard"
                    >
                      <FaLink size={16} />
                    </button>
                  </div>

                  {copied && (
                    <p className="mt-2 text-xs text-green-600 text-center animate-fade-in-up">
                      Link copied to clipboard!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <div className="flex flex-col">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <p className="text-sm text-gray-400 shadow-sm font-bold bg-white border-b-1 px-2">
              Author
            </p>
            <div className="bg-white shadow-sm p-6">
              <div className="flex items-start gap-4">
                {/* Placeholder for author image/avatar */}
                <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex-shrink-0 flex items-center justify-center text-gray-500 text-sm">
                  <img src={author.image} alt="Author" className="max-h-20" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {author.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{author.bio}</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <Link
                  href={`/v1/profile/${author.email}`}
                  className="border px-4 py-1 rounded-sm shadow-sm hover:shadow-md "
                >
                  Visit Profile
                </Link>
              </div>
            </div>
          </section>

          <RelatedArticles catid={article.catid} id={article._id} />
          <ArticleSummarizer content={article.content} session={session} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInOut 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
