import dynamic from "next/dynamic";
import React from "react";
import AIWriter from "@/components/AIWriter";

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
    description: "Generate professional, SEO-optimized articles instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AIWriter />;
}
