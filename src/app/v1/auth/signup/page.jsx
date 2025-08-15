import React from "react";
import Signup from "./Signup";

export const metadata = {
  title: "Join Kalamkunja | Sign Up",
  description:
    "Create your Kalamkunja account and become part of a knowledge-driven community. Share, learn, and grow together.",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/auth/signup`,
  },
};

const SignipPage = () => {
  return <Signup />;
};

export default SignipPage;
