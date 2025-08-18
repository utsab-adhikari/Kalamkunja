import React from "react";
import CategoryArticlesPage from "./CategoryArticlesPage";

export async function generateMetadata({ params }) {
  const { id } = await params;

  let category = null;

  try {
    const baseUrl = process.env.baseUrl;
    const res = await fetch(`${baseUrl}/api/v1/category/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (data.success) {
      category = data.category;
    }
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  return {
    title: category
      ? `${category.category} | Kalamkunja`
      : "Category Not Found",
    description: category?.description || "Explore articles in this category",
    openGraph: {
      title: category?.category || "Category Not Found",
      description: category?.description || "Explore articles in this category",
      images: [
        {
          url: "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: category?.category || "Category image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category?.category || "Category Not Found",
      description: category?.description || "Explore articles in this category",
      images: ["/default-twitter.jpg"],
    },
    alternates: {
      canonical: `/v1/category/${id}`,
    },
  };
}

export default async function page({ params }) {
  const { id } = await params;

  return <CategoryArticlesPage categoryId={id} />;
}
