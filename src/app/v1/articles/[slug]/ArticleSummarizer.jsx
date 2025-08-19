"use client";

import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export default function ArticleSummarizer({ content, session }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!content) return;

    setLoading(true);
    setError("");
    setSummary("");
    setCopied(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/v1/summarizer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            user: session?.user || "undefined",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to summarize the article.");
        return;
      }

      setSummary(data.message);
    } catch (err) {
      console.error(err);
      setError("Failed to summarize the article.");
    } finally {
      setLoading(false);
    }
  };

  const copySummary = () => {
    if (!summary) return;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-6xl mx-4 sm:px-6 py-8 bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Summary</h2>
      <p className="text-gray-600 mb-4">
        Quickly get a simplified, easy-to-understand summary of this article.
      </p>

      <div className="flex gap-4 flex-wrap mb-4">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="flex gap-2 items-center">
              <FiLoader className="animate-spin" />
              Summarizing
            </div>
          ) : (
            "Summarize Article"
          )}
        </button>

        {summary && (
          <button
            onClick={copySummary}
            className={`px-6 py-2 rounded-md text-white font-medium transition ${
              copied ? "bg-green-500" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {copied ? "Copied!" : "Copy Summary"}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-600 mt-4 font-medium animate-fade-in-up">
          {error}
        </p>
      )}

      {summary && (
        <textarea
          readOnly
          value={summary}
          className="mt-6 w-full min-h-100 p-4 border rounded-md text-gray-800 resize-none focus:outline-none"
        />
      )}
    </section>
  );
}
