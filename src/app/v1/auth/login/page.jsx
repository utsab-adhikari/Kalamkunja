import React from "react";
import Login from "./Login";

export const metadata = {
  title: "Login | Kalamkunja",
  description:
    "Access your Kalamkunja account to read, write, and engage with insightful articles from across disciplines.",
  alternates: {
    canonical: `${process.env.baseUrl}/v1/auth/login`,
  },
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
