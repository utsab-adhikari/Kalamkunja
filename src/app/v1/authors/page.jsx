import React from "react";
import AuthorsPage from "./AuthorsPage";

export const metadata = {
  title: "Authors | Kalamkunja",
  description:
    "Visit our authors profile for Articles",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/authors`,
  },
};

const AuthorPage = () => {
  return <AuthorsPage />;
};

export default AuthorPage;
