"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (status === "unauthenticated") {
      return;
    } else if (status === "authenticated" || session) {
      toast.error("Already Signed In");
      router.push("/");
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submission
    setError(""); // Clear previous errors

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Set loading to false after response
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Set loading to true
    setError(""); // Clear previous errors
    try {
      await signIn("google", { callbackUrl: "/" }); // Redirect to home after Google sign-in
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Welcome Back!
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-6 text-center border border-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <FcGoogle className="text-2xl" /> {/* Google Icon */}
          {loading ? "Signing In with Google..." : "Google"}
        </button>

        <p className="text-sm mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/v1/auth/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
