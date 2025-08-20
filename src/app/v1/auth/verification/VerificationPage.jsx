"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SendVerificationPage() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Login First");
      router.push("/v1/auth/login");
    } else if (status === "authenticated" && session.user.isVerified) {
      toast.error("Already Verified");
      router.push("/");
    }
  }, [session, status, router]);

  const sendVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/auth/verification");
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center px-6 py-6">
      {/* Card with background logo */}
      <div className="relative max-w-md w-full bg-white p-8 shadow-lg border border-gray-200 text-center">
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundSize: "300px", // adjust size here
            opacity: 0.3, // low opacity
          }}
        ></div>
        {/* Transparent overlay for text clarity */}
        <div className="bg-white/90 p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Email Verification
          </h1>

          <p className="text-gray-700 mb-4">
            👋 Thank you for signing up with{" "}
            <span className="font-semibold">Kalamkunja</span>!
          </p>
          <p className="text-gray-600 mb-6">
            Please verify your email to activate your account. Click the button
            below to receive a verification email. After clicking, check your
            inbox (and spam folder).
          </p>

          <button
            onClick={sendVerification}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2.5 shadow hover:bg-blue-700 rounded-sm disabled:bg-gray-400 transition"
          >
            {loading ? "Sending..." : "Send Verification Email"}
          </button>

          {/* Response message */}
          {msg && (
            <p className="mt-4 text-green-600 font-medium">
              {msg}, You can Resend
            </p>
          )}

          {/* Transparency info */}
          <div className="mt-6 text-sm text-gray-500 border-t pt-4">
            <p className="font-semibold text-gray-700 mb-2">
              🔒 Privacy & Transparency
            </p>
            <p className="mb-1">
              Kalamkunja may access the following from your email provider:
            </p>
            <ul className="list-disc list-inside text-left mx-auto max-w-sm">
              <li>
                Your <strong>name</strong>
              </li>
              <li>
                Your <strong>email address</strong>
              </li>
              <li>
                Your <strong>profile image</strong> (if available)
              </li>
            </ul>
            <p className="mt-3">
              We only use this information to personalize your experience on
              Kalamkunja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
