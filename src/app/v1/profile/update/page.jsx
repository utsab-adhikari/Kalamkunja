"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfileUpdatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    featuredImage: "",
    contact: "",
    facebook: "",
    github: "",
    bio: "", // ✅ Added bio
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load profile data once session is ready
  useEffect(() => {
    if (status !== "authenticated") return; // wait until session is loaded

    const loadProfile = async () => {
      try {
        const res = await axios.get("/api/v1/profile/update");
        if (res.data.success) {
          setForm({
            name: res.data.user.name || "",
            featuredImage: res.data.user.image || "",
            contact: res.data.user.contact || "",
            facebook: res.data.user.facebook || "",
            github: res.data.user.github || "",
            bio: res.data.user.bio || "", // ✅ Load bio
          });
        }
      } catch {
        setMessage("Failed to load profile");
      }
    };
    loadProfile();
  }, [status]);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload from ImageUploader component
  const handleImageUpload = (url) => {
    setForm((prev) => ({ ...prev, featuredImage: url }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put("/api/v1/profile/update", form);
      setMessage(res.data.message);

      setTimeout(() => {
        if (session?.user?.email) {
          router.push(`/v1/profile/${encodeURIComponent(session.user.email)}`);
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (error) {
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Show loading or unauthorized message
  if (status === "loading") {
    return <p className="text-center mt-10">Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-center mt-10 text-red-600">
        You must be logged in to update your profile.
      </p>
    );
  }

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md sm:mt-16 sm:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Update Profile</h1>

      {form.featuredImage && (
        <div className="flex justify-center mb-6">
          <img
            src={form.featuredImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border shadow-sm"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            rows={4}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            disabled={loading}
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block font-medium mb-2">Profile Image</label>
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="contact" className="block font-medium mb-1">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Contact number or details"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Facebook */}
        <div>
          <label htmlFor="facebook" className="block font-medium mb-1">
            Facebook URL
          </label>
          <input
            type="url"
            id="facebook"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            placeholder="https://facebook.com/yourprofile"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* GitHub */}
        <div>
          <label htmlFor="github" className="block font-medium mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="https://github.com/yourusername"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
