"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiCopy, FiDownload, FiLoader } from "react-icons/fi";
import ErrorDisplay from "./ErrorDisplay";
import { useSession } from "next-auth/react";

export default function AIWriter() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [tone, setTone] = useState("Formal");
  const [length, setLength] = useState("Medium"); // Short, Medium, Long
  const [article, setArticle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const outputRef = useRef(null);

  const buildPrompt = (topic) => {
    // This user message will be appended to your assistantProfile system message on the server.
    return `Write a professional, SEO-optimized article on the topic/title: "${topic}".
    
Requirements:
- Audience: professionals, learners and general global readers.
- Structure: Title, short intro, table of contents (3-6 items), H2 / H3 headings as appropriate, bullet points where useful, a clear conclusion, and references/suggested reading (if applicable).
- Tone: ${tone.toLowerCase()}.
- Length: ${length.toLowerCase()} (Short ~ 400-600 words, Medium ~ 800-1200 words, Long ~ 1500+ words).
- Provide a **SEO meta title** (max 70 chars) and a **meta description** (max 160 chars) at the top in this format:
META_TITLE: <your meta title>
META_DESCRIPTION: <your meta description>

- Include an article in clean markdown format below those meta tags for easy copying.
- Do not include any unrelated commentary or internal prompts. Keep content original and factual.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setArticle("");
    setMetaTitle("");
    setMetaDescription("");

    if (!title.trim()) {
      setError("Please provide a topic or article title.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/v1/ai/studio`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: buildPrompt(title),
            user: session?.user || "undefined",
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to generate article");
      }

      const data = await response.json();
      const aiText = data?.message || "";

      const metaTitleMatch = aiText.match(/META_TITLE:\s*(.*)/i);
      const metaDescMatch = aiText.match(/META_DESCRIPTION:\s*(.*)/i);

      const metaT = metaTitleMatch ? metaTitleMatch[1].trim() : "";
      const metaD = metaDescMatch ? metaDescMatch[1].trim() : "";

      // remove meta lines from article body
      let articleBody = aiText
        .replace(/META_TITLE:\s*.*\n?/i, "")
        .replace(/META_DESCRIPTION:\s*.*\n?/i, "")
        .trim();

      setMetaTitle(metaT);
      setMetaDescription(metaD);
      setArticle(articleBody);
      // scroll to output
      setTimeout(() => {
        outputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(article || "");
      toast.success("Article copied to clipboard!");
    } catch {
      setError("Failed to copy. Try selecting the text manually.");
    }
  };

  const downloadMarkdown = () => {
    const md = `# ${metaTitle || title}\n\n${
      metaDescription ? `> ${metaDescription}\n\n` : ""
    }${article}`;
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(metaTitle || title)
      .replace(/\s+/g, "-")
      .toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading Studio...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Kalamkunja — AI Article Studio
          </h1>
          <p className="mt-2 text-gray-600">
            Enter a topic or title and get a professional, SEO-optimized article
            that you can copy or download.
          </p>
        </header>

        <section className="bg-white shadow-sm border border-gray-200 p-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic / Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., The Future of AI in Nepali Journalism"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option>Formal</option>
                    <option>Informative</option>
                    <option>Conversational</option>
                    <option>Persuasive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Length
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      "Generate Article"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <ErrorDisplay error={error} />

            <div ref={outputRef} className="mt-6">
              {loading && (
                <div className="bg-gray-50 border border-gray-200 p-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <FiLoader className="animate-spin" />
                    <span>
                      Generating your professional article — this may take a few
                      seconds...
                    </span>
                  </div>
                </div>
              )}

              {!loading && article && (
                <>
                  <article className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {metaTitle || title}
                        </h2>
                        {metaDescription && (
                          <p className="text-sm text-gray-600">
                            {metaDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={copyToClipboard}
                          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <FiCopy /> Copy
                        </button>
                        <button
                          onClick={downloadMarkdown}
                          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
                        >
                          <FiDownload /> Download .md
                        </button>
                      </div>
                    </div>

                    {/* Render the generated markdown as inner HTML: convert markdown to HTML */}
                    {/* For safety and simplicity, we just display the raw markdown in a <pre> block and also render markdown lightly */}
                    <section className="bg-white border border-gray-100 p-6 shadow-sm">
                      {/* Rendered MD preview */}
                      <div className="prose max-w-none">
                        {/* Simple rendering approach: show markdown as text block.
                    If you want rich rendering, integrate a markdown-to-html library like marked or react-markdown. */}
                        <pre className="whitespace-pre-wrap text-sm">
                          {article}
                        </pre>
                      </div>
                    </section>
                  </article>
                  <div className="flex items-center justify-center py-5">
                    <Link
                      href="/v1/articles/create"
                      className=" w-full bg-white shadow-sm border py-1 text-center hover:shadow-md"
                    >
                      Lets create Article
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
