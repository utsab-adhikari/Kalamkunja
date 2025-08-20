import React from "react";
import ProjectOverview from "./AboutProject";


export const metadata = {
  title: "Project - Overview | Kalamkunja",
  description:
    "About the technologies and dependencies used in Kalamkunja",
  alternates: {
    canonical: `https://kalamkunja.vercel.app/about-project`,
  },
};

const Page = () => {
  return <ProjectOverview/>;
};

export default Page;
