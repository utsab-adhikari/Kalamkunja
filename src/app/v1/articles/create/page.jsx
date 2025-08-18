import React from "react";
import CreateArticle from "./Create";

export const metadata = {
  title: "Create Article | Kalamkunja",
  description:
    "Publish your insights on Kalamkunja. Start writing thoughtful articles and share your expertise with the world.",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/articles/create`, // adjust if your route is different
  },
};

const CreateArticlePage = () => {
  return <CreateArticle />;
};

export default CreateArticlePage;
