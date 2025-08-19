"use client";
import { useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RecordView() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getIPAddress = async () => {
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      return res.data.ip;
    } catch {
      return "unknown";
    }
  };

  const viewerId = session?.user?.id || null;

  useEffect(() => {
    const recordView = async () => {
      const ipAddress = await getIPAddress();
      axios
        .post("/api/v1/view", { viewerId, pathname, ipAddress })
        .catch(console.error);
    };

    recordView();
  }, [pathname, viewerId]);

  return null; // This component doesn't render anything
}
