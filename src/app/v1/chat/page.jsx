// app/chat/page.js
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserList from "@/components/chats/UserList";
import ChatWindow from "@/components/chats/ChatWindow";
import { HiMenu } from "react-icons/hi";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading chats...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
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

  return (
    <div className="flex h-screen relative bg-gray-50">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden absolute top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-72 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 shadow-lg
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <UserList
          session={session}
          selectedUser={selectedUser}
          onSelectUser={(user) => {
            setSelectedUser(user);
            setSidebarOpen(false); // close on mobile when a user is selected
          }}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow session={session} selectedUser={selectedUser} />
      </div>
    </div>
  );
}
