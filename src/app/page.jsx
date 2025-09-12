"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { FaLinkedin, FaGithub, FaGlobe, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import CategoryAccordion from "@/components/home/Categories";

// Skeleton loader component
const SkeletonCard = ({ lines = 2 }) => (
  <div className="bg-white shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded mb-2" />
      ))}
    </div>
  </div>
);

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Login to create articles");
    } else if (
      status === "authenticated" &&
      session?.user?.isVerified === false
    ) {
      toast.error("Verify your email first");
      router.push("/v1/auth/verification");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoadingArticles(true);
      try {
        const res = await axios.get("/api/v1/articles");
        if (res.data.success) {
          setArticles(res.data.articles.slice(0, 6));
        }
      } catch (err) {
        toast.error("Failed to load articles");
      }
      setLoadingArticles(false);
    };

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get("/api/v1/category");
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        toast.error("Failed to load categories");
      }
      setLoadingCategories(false);
    };

    fetchArticles();
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLines = 2) => {
    if (!content) return "";
    const lines = content.split("\n").slice(0, maxLines);
    return (
      lines.join(" ") + (content.split("\n").length > maxLines ? "..." : "")
    );
  };

  return (
    <div className="pt-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12">
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "300px", // adjust size here
              opacity: 0.3, // low opacity
            }}
          ></div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kalamkunja - Explore the Core of Knowledge
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Dive deep into insightful articles, expert opinions, and
              cutting-edge research across all fields of human knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/v1/articles"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Browse Articles
              </Link>
              {status === "unauthenticated" && (
                <Link
                  href="/v1/auth/signup"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-center"
                >
                  Join Community
                </Link>
              )}
              {status === "authenticated" && (
                <Link
                  href="/v1/articles/create"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-center"
                >
                  Publish an Article
                </Link>
              )}
              {status === "loading" && (
                <div className="px-6 py-3 bg-gray-200 text-gray-500 font-medium rounded-lg text-center">
                  Loading...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Articles
          </h2>
          <Link
            href="/v1/articles"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all
          </Link>
        </div>

        {loadingArticles ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/v1/articles/${article.slug}`}
                key={article._id}
                className="cursor-pointer border border-gray-200 bg-white flex flex-col shadow hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Featured Image */}
                <div
                  className="h-48 bg-cover bg-center border-b border-gray-200"
                  style={{
                    backgroundImage: `url(${
                      article.featuredImage ||
                      "https://via.placeholder.com/600x300?text=No+Image"
                    })`,
                  }}
                />

                {/* Article Content */}
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
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Auth Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {status === "unauthenticated" && (
          <div className="bg-white border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Join Our Knowledge Community
            </h2>
            <p className="text-gray-600 mb-6">
              Login or sign up to publish articles, interact with authors, and
              be part of the Kalamkunja family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/v1/auth/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/v1/auth/signup"
                className="px-6 py-3 bg-white border border-blue-300 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 shadow-lg p-8 text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Meet Our Authors
          </h2>
          <p className="text-gray-600 mb-6">
            Discover talented authors and explore their latest contributions to
            our platform.
          </p>
          <Link
            href="/v1/authors"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            View Authors
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryAccordion categories={categories} />

      {/* Kalamkunja AI Studio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative bg-gradient-to-r from-purple-50 to-indigo-50 p-8 sm:p-12 shadow-lg overflow-hidden">
          {/* Background illustration */}
          <div
            className="absolute inset-0 opacity-10 bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png')",
              backgroundSize: "400px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Kalamkunja AI Studio
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Unlock the power of Artificial Intelligence for your research,
                writing, and creativity. The AI Studio helps you generate ideas,
                draft content, and explore knowledge faster than ever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/v1/ai/studio"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Try AI Studio
                </Link>
                <Link
                  href="/v1/articles"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Illustration / Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                alt="AI Studio Illustration"
                className="w-64 h-64 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16">
        <div className="relative p-6 sm:p-8 md:p-12 flex flex-col md:flex-row justify-evenly items-center md:items-start gap-6 md:gap-8 overflow-hidden">
          {/* Profile Image */}
          <div className="flex-shrink-0 relative z-10 flex flex-col items-center md:items-start">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocK-V4W5o3dbTHMoqIpxlVfslEjvRBgwroE2MnxtFOdmzMDKIxM=s96-c"
                alt="Utsab Adhikari - Creator of Kalamkunja"
                width={160}
                height={160}
                className="object-cover shadow-lg border-4 border-white rounded"
              />
              {/* Sharp corner indicators */}
              <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-4 border-l-4 border-blue-600"></div>
              <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-4 border-r-4 border-blue-600"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-4 border-l-4 border-blue-600"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-4 border-r-4 border-blue-600"></div>
            </div>

            {/* Name & short bio (centered on mobile) */}
            <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mt-4 text-center md:text-left">
              Utsab Adhikari
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center md:text-left max-w-xs">
              A passionate developer, designer, and innovator dedicated to
              building meaningful digital experiences.
            </p>
          </div>

          {/* Right Side Content */}
          <div className="relative z-10 text-center md:text-left w-full max-w-lg">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              The Mind Behind the Platform
            </h2>

            {/* Roles */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {["Admin", "Developer", "Designer", "CEO"].map((role, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-800 px-3 py-1 text-xs sm:text-sm font-medium border border-blue-100"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div className="text-gray-700 text-sm sm:text-base space-y-3 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="bg-green-50 p-2 rounded">
                  <FaWhatsapp className="text-green-600 text-lg sm:text-xl" />
                </div>
                <a
                  href="https://wa.me/9867508725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-green-700 font-medium"
                >
                  9867508725
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="bg-red-50 p-2 rounded">
                  <MdEmail className="text-red-600 text-lg sm:text-xl" />
                </div>
                <a
                  href="mailto:utsabadhiakri075@gmail.com"
                  className="hover:underline hover:text-red-700 font-medium"
                >
                  utsabadhiakri075@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="bg-blue-50 p-2 rounded">
                  <MdLocationOn className="text-blue-600 text-lg sm:text-xl" />
                </div>
                <span className="font-medium">Kathmandu, Nepal</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 sm:gap-5 justify-center md:justify-start">
              <a
                href="https://linkedin.com/in/utsabadhikari"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-blue-100 p-2 sm:p-3 rounded transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-blue-700 text-lg sm:text-xl" />
              </a>
              <a
                href="https://github.com/utsabadhikari"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="text-gray-800 text-lg sm:text-xl" />
              </a>
              <a
                href="https://utsab-ad.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-green-100 p-2 sm:p-3 rounded transition-colors duration-300"
                aria-label="Website"
              >
                <FaGlobe className="text-green-600 text-lg sm:text-xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
