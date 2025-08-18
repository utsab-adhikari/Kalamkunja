import React from 'react'
import ManageCategories from './ManageCategories'

export const metadata = {
  title: "Article Categories | Kalamkunja",
  description:
    "Publish your insights on Kalamkunja. Start writing thoughtful articles and share your expertise with the world.",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/category`,
  },
};

const CategoriesPage = () => {
  return (
    <ManageCategories/>
  )
}

export default CategoriesPage