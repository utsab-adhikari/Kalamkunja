import React from 'react'
import ArticlesPage from './ArticlesPage';

export const metadata = {
  title: "All Articles | Kalamkunja",
  description:
    "Read insights on Kalamkunja. Start Reading thoughtful articles and share your expertise with the world.",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/category`, // adjust if your route is different
  },
};

const Page = () => {
  return (
    <ArticlesPage/>
  )
}

export default Page