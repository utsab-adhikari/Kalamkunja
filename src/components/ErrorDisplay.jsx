import { useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import ProPopup from "./Propupup";

export default function ErrorDisplay({ error }) {
  const [showProPopup, setShowProPopup] = useState(false);

  const handleProClick = () => setShowProPopup(true);
  const handleClose = () => setShowProPopup(false);

  if (!error) return null;

  const isRateLimit =
    (typeof error === "string" && error.toLowerCase().includes("too many")) ||
    error?.status === 429;

  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Something went wrong.";

  return (
    <>
      {/* Error Box */}
      <div
        className={`mt-4 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-md shadow-sm ${
          isRateLimit
            ? "bg-yellow-50 border-yellow-300 text-yellow-800"
            : "bg-red-50 border-red-200 text-red-700"
        }`}
      >
        <span className="flex-1">
          {isRateLimit
            ? "Too many requests. Please try again later."
            : errorMessage}
        </span>
        {isRateLimit && (
          <button
            onClick={handleProClick}
            className="px-3 py-1 shadow-sm bg-white text-black rounded-md hover:shadow-md transition duration-200"
          >
            Upgrade to AI Studio Pro
          </button>
        )}
      </div>
      <ProPopup
        showProPopup={showProPopup}
        handleClose={() => setShowProPopup(false)}
      />
    </>
  );
}
