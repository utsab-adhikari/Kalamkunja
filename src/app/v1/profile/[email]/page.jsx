import React from "react";
import ProfilePage from "./ProfilePage";

export async function generateMetadata({ params }) {
  const { email } = await params;
  let user = null;

  try {
    const res = await fetch(`${process.env.baseUrl}/api/v1/profile/${email}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success) user = data.user;
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  if (!user) {
    return {
      title: "Profile Not Found | Kalamkunja",
      description:
        "The requested user profile could not be found on Kalamkunja.",
      openGraph: {
        title: "Profile Not Found | Kalamkunja",
        description:
          "The requested user profile could not be found on Kalamkunja.",
        url: `${process.env.baseUrl}/v1/profile/${email}`,
        siteName: "Kalamkunja",
        images: [
          {
            url: `https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png`,
            width: 1200,
            height: 630,
            alt: "Profile Not Found",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Profile Not Found | Kalamkunja",
        description:
          "The requested user profile could not be found on Kalamkunja.",
        images: [`${process.env.baseUrl}/logo.png`],
      },
    };
  }

  return {
    title: `${user.name} | Kalamkunja`,
    description: user.bio || `${user.name}'s profile on Kalamkunja.`,
    keywords: [
      user.name,
      "Kalamkunja",
      "Writer",
      "Author",
      "Blogger",
      "Profile",
      ...(user.keywords || []),
    ],
    openGraph: {
      title: `${user.name} | Kalamkunja`,
      description: user.bio || `${user.name}'s profile on Kalamkunja.`,
      url: `${process.env.baseUrl}/v1/profile/${user.email}`,
      siteName: "Kalamkunja",
      images: [
        {
          url:
            user.image ||
            `https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png`,
          width: 1200,
          height: 630,
          alt: `${user.name} - Kalamkunja`,
        },
      ],
      locale: "en_US",
      type: "profile",
      profile: {
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ").slice(1).join(" "),
        username: user.username || user.email,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} | Kalamkunja`,
      description: user.bio || `${user.name}'s profile on Kalamkunja.`,
      images: [
        user.image || `${process.env.baseUrl}/images/default-profile.jpg`,
      ],
    },
  };
}

export default async function Page({ params }) {
  const { email } = await params;
  return <ProfilePage email={email} />;
}
