"use client";

import { useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

export default function ImageUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return setError("Only JPG, PNG, or WEBP files are allowed.");
    }
    if (file.size > 3 * 1024 * 1024) {
      return setError("File too large. Max 3MB allowed.");
    }

    setError(null);
    setUploading(true);

    try {
      const sigRes = await fetch("/api/sign-upload");
      const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudRes.json();
      setUploading(false);

      if (data.secure_url) {
        onUpload(data.secure_url);
        setUploadedUrl(data.secure_url);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Upload input or spinner */}
      {uploading ? (
        <div className="flex items-center gap-2 text-indigo-400 text-sm animate-pulse">
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          Uploading image...
        </div>
      ) : (
          <label className="inline-flex items-center gap-2 px-4 py-2 w-full shadow-sm border bg-white hover:shadow-md text-center font-medium text-sm rounded-md cursor-pointer transition">
          <AiOutlineCloudUpload className="text-lg" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {uploadedUrl && (
        <div className="flex items-center gap-2 text-green-400">
          <FaCheckCircle className="text-lg" />
          Uploaded successfully!
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
    </div>
  );
}
