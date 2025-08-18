import React from "react";
import ProjectOverview from "./AboutProject";


export const metadata = {
  title: "Project - Overview | Kalamkunja",
  description:
    "About the technologies and dependencies used in Kalamkunja",
  alternates: {
    canonical: `${process.env.baseUrl}/about-project`,
  },
};

const Page = () => {
  return <ProjectOverview/>;
};

export default Page;
