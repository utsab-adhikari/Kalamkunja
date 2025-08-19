// src/components/ClientProviders.jsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import RecordView from "./RecordView";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <RecordView />
      {children}
    </SessionProvider>
  );
}
