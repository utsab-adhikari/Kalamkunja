"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaChartBar, FaUsers, FaCogs, FaFileAlt, FaEye } from "react-icons/fa";

export default function AdminPage() {
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/admin");
        setStats({
          users: res.data.users || 0,
          articles: res.data.articles || 0,
          views: res.data.views || 0,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch admin stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const navItems = [
    { name: "Analytics", href: "/v1/analytics", icon: <FaChartBar /> },
    { name: "Users", href: "/v1/users", icon: <FaUsers /> },
    { name: "Settings", href: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">KalamKunja Admin</h1>
        <p className="text-gray-600 text-lg">Manage your website efficiently</p>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 text-center">
          <div className="text-3xl text-indigo-600 mb-2"><FaUsers /></div>
          <h2 className="text-lg font-medium text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.users}
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 text-center">
          <div className="text-3xl text-green-600 mb-2"><FaFileAlt /></div>
          <h2 className="text-lg font-medium text-gray-500">Total Articles</h2>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.articles}
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 text-center">
          <div className="text-3xl text-blue-600 mb-2"><FaEye /></div>
          <h2 className="text-lg font-medium text-gray-500">Total Views</h2>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : stats.views}
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-center mb-6 font-medium">{error}</p>
      )}

      {/* Navigation Buttons */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
              <div className="text-4xl text-indigo-600 mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
