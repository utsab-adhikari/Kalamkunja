"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("articles");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/v1/dashboard");
      if (res.data.success) {
        setDashboardData(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setNotification({
        type: "error",
        message: "Failed to load dashboard data",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboard();
    }
  }, [status]);

  const handleArticleAction = async (articleId, action) => {
    setLoading(true);
    setMenuOpen(null); // Close menu immediately

    try {
      let res;
      switch (action) {
        case "delete":
          // Move to trash
          res = await axios.put("/api/v1/actions/trash", { articleId });
          break;
        case "publish":
          // Publish article
          res = await axios.put("/api/v1/actions/publish", { articleId });
          break;
        case "restore":
          // Restore from trash
          res = await axios.put("/api/v1/actions/restore", { articleId });
          break;
        case "unpublish":
          // Unpublish article
          res = await axios.put("/api/v1/actions/unpublish", { articleId });
          break;
        case "delete-permanent":
          // Permanent delete
          res = await axios.delete(`/api/v1/articles/${articleId}`);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      if (res.data.success) {
        setNotification({
          type: "success",
          message: `Action completed: ${action}`,
        });
        fetchDashboard(); // Refresh data
      } else {
        throw new Error(res.data.message || "Action failed");
      }
    } catch (error) {
      console.error("Error performing action:", error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Action failed",
      });
    } finally {
      setTimeout(() => setNotification({ type: "", message: "" }), 3000);
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-center">Please log in to view dashboard.</div>
    );
  }

  const { articles, totals } = dashboardData || {};

  return (
    <>
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-in
        ${
          notification.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}
        >
          {notification.message}
        </div>
      )}

      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
          {/* Profile Image & Info */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <img
              src={session.user.image || `${process.env.baseUrl}/logo.png`}
              alt={session.user.name || "User"}
              className="w-20 h-20 rounded-full border shadow-sm object-cover"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  {session.user.name}
                </h1>
                {session.user.isVerified && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full border border-blue-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">
                User ID: <span className="font-medium">{session.user.id}</span>
              </p>
            </div>
          </div>

          {/* Profile Visits */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex flex-col items-center text-center min-w-[100px]">
            <p className="text-sm text-gray-500">Profile Visits</p>
            <p className="text-lg font-bold text-gray-900">
              {dashboardData.profileViews}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/v1/articles/create"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            Publish an Article
          </Link>
          <Link
            href="/v1/ai/studio"
            className="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
          >
            AI Assistant
          </Link>
          <Link
            href="/v1/profile"
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-800 font-medium shadow hover:bg-gray-200 transition"
          >
            View Profile
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b overflow-x-auto pb-1">
          {["articles", "analytics", "drafts", "trash"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-3 capitalize text-sm md:text-base border-b-2 transition-all
            ${
              activeTab === tab
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-full">
          {activeTab === "articles" && (
            <Section title="Published Articles">
              {articles?.published?.length ? (
                <div className="grid grid-cols-1 gap-4">
                  {articles.published.map((article) => (
                    <div key={article._id} className="min-w-0">
                      <ArticleCard
                        article={article}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        onEdit={() => router.push(`/v1/articles/update/${article.slug}`)}
                        onPreview={() => router.push(`/blog/${article.slug}`)}
                        onAction={handleArticleAction}
                        actions={["edit", "unpublish", "delete"]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No published articles yet" />
              )}
            </Section>
          )}

          {activeTab === "analytics" && (
            <Section title="Analytics Overview">
              <div className="grid grid-cols-1 gap-4">
                <StatCard
                  title="Published Blogs"
                  value={totals?.totalBlogs || 0}
                  change="+12% from last month"
                />
                <StatCard
                  title="Total Likes"
                  value={totals?.totalLikes || 0}
                  change="+24% from last month"
                />
                <StatCard
                  title="Total Views"
                  value={totals?.totalViews || 0}
                  change="+18% from last month"
                />
              </div>
              <div className="bg-white p-4 rounded-lg border mt-6">
                <h3 className="font-medium mb-3">Engagement Metrics</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-400">
                    Engagement chart visualization
                  </span>
                </div>
              </div>
            </Section>
          )}

          {activeTab === "drafts" && (
            <Section title="Drafts">
              {articles?.draft?.length ? (
                <div className="grid grid-cols-1 gap-4">
                  {articles.draft.map((article) => (
                    <div key={article._id} className="min-w-0">
                      <ArticleCard
                        article={article}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        onEdit={() => router.push(`/v1/articles/update/${article.slug}`)}
                        onPreview={() => router.push(`/preview/${article._id}`)}
                        onAction={handleArticleAction}
                        actions={["edit", "publish", "delete"]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No drafts found" />
              )}
            </Section>
          )}

          {activeTab === "trash" && (
            <Section title="Trash">
              {articles?.trash?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {articles.trash.map((article) => (
                    <div key={article._id} className="min-w-0">
                      <ArticleCard
                        article={article}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        onPreview={() => router.push(`/preview/${article._id}`)}
                        onAction={handleArticleAction}
                        actions={["restore", "delete-permanent"]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="Trash is empty" />
              )}
            </Section>
          )}
        </div>
      </div>
    </>
  );
}

/* Reusable Components */
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const EmptyState = ({ message }) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <p className="text-gray-500">{message}</p>
  </div>
);

const ArticleCard = ({
  article,
  menuOpen,
  setMenuOpen,
  onEdit,
  onPreview,
  onAction,
  actions = [],
}) => {
  // Action label mapping
  const actionLabels = {
    edit: "Edit",
    preview: "Preview",
    publish: "Publish",
    unpublish: "Unpublish",
    delete: "Move to Trash",
    restore: "Restore",
    "delete-permanent": "Delete Permanently",
  };

  return (
    <div className="p-2 border shadow-sm hover:shadow-md transition bg-white relative">
      {/* Context Menu */}
      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(menuOpen === article._id ? null : article._id);
          }}
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Article actions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {menuOpen === article._id && (
          <div
            className="absolute right-0 mt-1 w-48 bg-white shadow-lg py-1 z-10 border"
            onClick={(e) => e.stopPropagation()}
          >
            {actions.map((action) => (
              <button
                key={action}
                onClick={() => {
                  if (action === "edit") {
                    onEdit();
                  } else if (action === "preview") {
                    onPreview();
                  } else {
                    onAction(article._id, action);
                  }
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  action === "delete-permanent"
                    ? "text-red-600 hover:bg-red-50"
                    : ""
                }`}
              >
                {actionLabels[action] || action}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="flex gap-3">
        {article?.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-16 h-16 object-cover "
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{article.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "No date"}
          </p>
          {article.updatedAt && (
            <p className="text-xs text-gray-400 mt-1">
              Updated: {new Date(article.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, change }) => (
  <div className="p-4 bg-white border rounded-lg shadow-sm">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {change && <p className="text-green-600 text-xs mt-2">{change}</p>}
  </div>
);
