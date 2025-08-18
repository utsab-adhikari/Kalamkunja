// src/components/ProvidersWrapper.jsx
"use client";

import ClientProviders from "./ClientProviders";

export default function ProvidersWrapper({ children }) {
  return <ClientProviders>{children}</ClientProviders>;
}