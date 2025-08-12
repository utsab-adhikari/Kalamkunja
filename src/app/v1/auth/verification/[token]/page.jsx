"use client";
import { useState } from "react";
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
    <>
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow text-center">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {statusMsg && <p className="mt-4">{statusMsg}</p>}
      </div>
    </>
  );
}
