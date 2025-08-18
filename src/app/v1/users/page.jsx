"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [updating, seUpdatingLoader] = useState(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 24; // users per page

  // Redirect if not admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated" && session.user.role === "admin") {
      fetchUsers();
    }
  }, [status, session]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/users");
      setUsers(res.data.users);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeleting(id);
    try {
      await axios.delete(`/api/v1/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  }

  async function updateUser(id) {
    if (!confirm("Are you sure you want to update this user?")) return;
    seUpdatingLoader(id);
    try {
      await axios.put(`/api/v1/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete user");
    } finally {
      seUpdatingLoader(null);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-center border border-blue-600 px-4 py-2 rounded-sm">
          Welcome {session.user.name}
        </h3>
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 flex flex-col items-center relative transition"
              >
                {/* Verified Badge */}
                {user.isVerified && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                    ✓ Verified
                  </span>
                )}

                {/* User Avatar */}
                <img
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border"
                />

                {/* Name & Email */}
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 text-center break-all">
                  {user.email}
                </p>

                {/* Role Badge */}
                <span
                  className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => deleteUser(user._id)}
                  disabled={deleting === user._id}
                  className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium transition ${
                    deleting === user._id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deleting === user._id ? "Deleting..." : "Delete"}
                </button>

                {!user.isVerified && (
                  <button
                    onClick={() => updateUser(user._id)}
                    disabled={updating === user._id}
                    className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium transition ${
                      updating === user._id
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {updating === user._id ? "Verifying..." : "Verify"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 bg-gray-100 rounded-lg">
              {page} / {Math.ceil(total / limit) || 1}
            </span>
            <button
              onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
              disabled={page * limit >= total}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
