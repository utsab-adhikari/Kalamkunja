import React from "react";
import ArticleDetails from "./articlePage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let article = null;

  try {
    const res = await fetch(`${process.env.baseUrl}/api/v1/articles/${slug}`);
    const data = await res.json();
    if (data.success) article = data.article;
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  return {
    title:
      `${article?.title} | ${article?.author} | Kalamkunja` ||
      "Article Not Found",
    description:
      article?.excerpt ||
      article?.content?.substring(0, 160) ||
      "Read this insightful article",
    openGraph: {
      title: article?.title || "Article Not Found",
      description:
        article?.excerpt ||
        article?.content?.substring(0, 160) ||
        "Read this insightful article",
      images: [
        {
          url: article?.featuredImage || `${process.env.baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: article?.title || "Article image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title || "Article Not Found",
      description:
        article?.excerpt ||
        article?.content?.substring(0, 160) ||
        "Read this insightful article",
      images: [article?.featuredImage || `${process.env.baseUrl}/logo.png`],
    },
    alternates: {
      canonical: `${process.env.baseUrl}/v1/articles/${slug}`,
    },
  };
}

export default async function page({ params }) {
  const { slug } = await params;

  return <ArticleDetails slug={slug} />;
}
