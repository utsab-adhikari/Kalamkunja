
import dynamic from "next/dynamic";
import React from "react";
import AIWriter from "@/components/AIWriter" 

export const metadata = {
  title: "Write with Kalamkunja — AI Article Studio",
  description:
    "Generate professional, SEO-optimized articles instantly. Provide a topic or title and Kalamkunja's AI will craft a well-structured, copy-ready article.",
  keywords: [
    "Kalamkunja",
    "AI writer",
    "article generator",
    "SEO-optimized articles",
    "professional writing",
  ],
  openGraph: {
    title: "Write with Kalamkunja — AI Article Studio",
    description:
      "Generate professional, SEO-optimized articles instantly. Provide a topic or title and Kalamkunja's AI will craft a well-structured, copy-ready article.",
    url: "https://kalamkunja.vercel.app/v1/ai/studio",
    siteName: "Kalamkunja",
    images: [
      {
        url: "/og-images/write-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write with Kalamkunja — AI Article Studio",
    description:
      "Generate professional, SEO-optimized articles instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Kalamkunja — AI Article Studio
          </h1>
          <p className="mt-2 text-gray-600">
            Enter a topic or title and get a professional, SEO-optimized article that you can copy or download.
          </p>
        </header>

        <section className="bg-white shadow-sm border border-gray-200 p-6">
          <AIWriter />
        </section>
      </div>
    </main>
  );
}
