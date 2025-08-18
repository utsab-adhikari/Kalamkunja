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
    } else if (status === "authenticated" && !session.user.isVerified) {
      return;
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
      setMsg("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <button
          onClick={sendVerification}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
        {msg && <p className="mt-4">{msg}</p>}
      </div>
    </>
  );
}
