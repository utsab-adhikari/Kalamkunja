// src/components/LoadingUI.jsx
"use client";

import Image from "next/image";

export default function LoadingUI() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="animate-pulse">
        <Image
          src="/logo.png"
          alt="KalamKunja Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      {/* Spinner */}
      <div className="mt-6 w-12 h-12 border-4 border-indigo-600 border-t-transparent border-b-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Loading kalamkunja, please wait...
      </p>
    </div>
  );
}
