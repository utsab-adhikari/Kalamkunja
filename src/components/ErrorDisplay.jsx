import { useState } from "react";
import { useRouter } from "next/navigation";
import ProPopup from "./Propupup";

export default function ErrorDisplay({ error }) {
  const router = useRouter();
  const [showProPopup, setShowProPopup] = useState(false);

  if (!error) return null;

  const message = typeof error === "string" ? error : error?.message || "";
  const status = error?.status || "";

  // Determine action type
  let actionType = null;
  if (message.toLowerCase().includes("sign")) {
    actionType = "signin";
  } else if (message.toLowerCase().includes("verify")) {
    actionType = "verify";
  } else if (message.toLowerCase().includes("too many")) {
    actionType = "upgrade";
  }

  const handleClick = () => {
    if (actionType === "signin") {
      router.push("/v1/auth/login");
    } else if (actionType === "verify") {
      router.push("/v1/auth/verification");
    } else if (actionType === "upgrade") {
      setShowProPopup(true);
    }
  };

  return (
    <>
      <div
        className={`mt-4 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-md shadow-sm ${
          actionType === "upgrade"
            ? "bg-yellow-50 border-yellow-300 text-yellow-800"
            : "bg-red-50 border-red-200 text-red-700"
        }`}
      >
        <span className="flex-1">{message || "Something went wrong."}</span>

        {actionType && (
          <button
            onClick={handleClick}
            className="px-3 py-1 shadow-sm bg-white text-black rounded-md hover:shadow-md transition duration-200"
          >
            {actionType === "signin"
              ? "Sign In"
              : actionType === "verify"
              ? "Verify Account"
              : "Upgrade to AI Studio Pro"}
          </button>
        )}
      </div>

      {/* Pro upgrade popup */}
      {actionType === "upgrade" && (
        <ProPopup
          showProPopup={showProPopup}
          handleClose={() => setShowProPopup(false)}
        />
      )}
    </>
  );
}
