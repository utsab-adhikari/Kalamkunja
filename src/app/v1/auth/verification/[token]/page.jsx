"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (status === "unauthenticated") {
        toast.error("Login First");
        router.push("/v1/auth/login");
      } else if (status === "authenticated" && session.user.isVerified) {
        toast.error("Already Verified");
        router.push("/");
      }
    }, [session, status, router]);

  const handleVerify = async () => {
    setLoading(true);
    setStatusMsg("Verifying...");
    try {
      const res = await axios.put(`/api/v1/auth/verification/${token}`);
      setStatusMsg(res.data.message);
      if (res.data.success) {
        setTimeout(() => router.push("/v1/profile/update"), 2000);
      }
    } catch {
      setStatusMsg("Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-10">
      {/* Card with logo watermark */}
      <div className="relative max-w-md w-full bg-white p-8 shadow-lg border border-gray-200 text-center">
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "300px", // adjust size here
            opacity: 0.3, // low opacity
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Email Verification
          </h1>

          <p className="text-gray-600 mb-6">
            To complete your signup with{" "}
            <span className="font-semibold">Kalamkunja</span>, please confirm
            your email by clicking the button below. Once verified, you’ll be
            redirected to update your profile.
          </p>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          {statusMsg && (
            <p className="mt-4 font-medium text-gray-700">{statusMsg}</p>
          )}

          {/* Abort Option */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-500">
            <p>
              ❓ If you did not request this verification, you can safely ignore
              or{" "}
              <button
                onClick={() => router.push("/")}
                className="text-blue-600 underline hover:text-blue-800"
              >
                abort now
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
