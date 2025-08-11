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

  return {
    title: user ? `${user.name} | Kalamkunja` : "Profile Not Found",
  };
}

export default async function Page({ params }) {
  const { email } = await params;

  return <ProfilePage email={email} />;
}
