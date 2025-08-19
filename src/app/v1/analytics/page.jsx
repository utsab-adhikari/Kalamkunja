"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer and related components (no SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Fix default Leaflet icon in Next.js
if (typeof window !== "undefined") {
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

const fetcher = (url) => fetch(url).then((res) => res.json());

// Country coordinates (for map markers)
const countryCoords = {
  US: { lat: 37.0902, lng: -95.7129 },
  IN: { lat: 20.5937, lng: 78.9629 },
  NP: { lat: 28.3949, lng: 84.124 },
  GB: { lat: 55.3781, lng: -3.436 },
  DE: { lat: 51.1657, lng: 10.4515 },
  FR: { lat: 46.2276, lng: 2.2137 },
  CA: { lat: 56.1304, lng: -106.3468 },
  AU: { lat: -25.2744, lng: 133.7751 },
  BR: { lat: -14.235, lng: -51.9253 },
  JP: { lat: 36.2048, lng: 138.2529 },
  CN: { lat: 35.8617, lng: 104.1954 },
  MX: { lat: 23.6345, lng: -102.5528 },
  ES: { lat: 40.4637, lng: -3.7492 },
  IT: { lat: 41.8719, lng: 12.5674 },
};

const PIE_COLORS = [
  "#4F46E5",
  "#16A34A",
  "#F59E0B",
  "#DC2626",
  "#06B6D4",
  "#9333EA",
  "#64748B",
  "#3B82F6",
];

export default function AnalyticsDashboard() {
  const { data, error } = useSWR("/api/v1/analytics", fetcher);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (error)
    return (
      <p className="text-red-600 p-8 font-medium">
        Failed to load analytics. Please check your API keys and network.
      </p>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading dashboard...</p>
      </div>
    );

  const { realtime, pages, summary, device, source } = data;

  // Processed Data
  const activeUsers = realtime.metricValues?.[0]?.value || 0;
  const locations =
    realtime.rows?.map((r) => ({
      country: r.dimensionValues[0].value,
      city: r.dimensionValues[1]?.value || "Unknown",
      users: +r.metricValues[0].value,
    })) || [];

  const topPages =
    pages.rows?.map((r) => ({
      path: r.dimensionValues[0].value,
      views: +r.metricValues[0].value,
    })) || [];

  const newUsers = summary.rows?.[0]?.metricValues?.[0]?.value || 0;
  const bounceRate = (
    parseFloat(summary.rows?.[0]?.metricValues?.[1]?.value || 0) * 100
  ).toFixed(2);
  const avgSession = parseFloat(
    summary.rows?.[0]?.metricValues?.[2]?.value || 0
  ).toFixed(2);

  const deviceData =
    device.rows?.map((r) => ({
      device: r.dimensionValues[0].value,
      users: +r.metricValues[0].value,
    })) || [];

  const sourceData =
    source.rows?.map((r) => ({
      source: r.dimensionValues[0].value,
      users: +r.metricValues[0].value,
    })) || [];

  return (
    <div className="p-6 sm:p-10 space-y-10 min-h-screen bg-gray-50 text-gray-900 font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        📊 Admin Analytics Dashboard
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-gray-200 shadow-sm text-center">
          <h2 className="text-sm font-medium text-gray-500">
            Real-Time Active Users
          </h2>
          <p className="text-3xl font-bold text-indigo-600">{activeUsers}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm text-center">
          <h2 className="text-sm font-medium text-gray-500">New Users (7d)</h2>
          <p className="text-3xl font-bold text-green-600">{newUsers}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm text-center">
          <h2 className="text-sm font-medium text-gray-500">
            Bounce Rate (7d)
          </h2>
          <p className="text-3xl font-bold text-red-600">{bounceRate}%</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm text-center">
          <h2 className="text-sm font-medium text-gray-500">
            Avg. Session Duration
          </h2>
          <p className="text-3xl font-bold text-blue-600">{avgSession}s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages Bar Chart */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Pages (7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPages}>
              <XAxis
                dataKey="path"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Device Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="users"
                nameKey="device"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ device, percent }) =>
                  `${device} ${(percent * 100).toFixed(0)}%`
                }
              >
                {deviceData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Pages Table */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Top Pages (7 Days)</h2>
          <div className="max-h-[400px] overflow-y-auto border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold">Path</th>
                  <th className="py-2 px-4 text-left font-semibold">Views</th>
                </tr>
              </thead>
              <tbody>
                {topPages.length > 0 ? (
                  topPages.map((page, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{page.path}</td>
                      <td className="py-2 px-4">{page.views}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-500">
                      No page data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceData}>
              <XAxis
                dataKey="source"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Locations */}
      <div className="bg-white border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          User Locations (Real-time)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mounted && (
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{
                height: "400px",
                width: "100%",
                border: "1px solid #e5e7eb",
              }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc, i) => {
                const coords = countryCoords[loc.country];
                if (!coords) return null;
                return (
                  <Marker key={i} position={[coords.lat, coords.lng]}>
                    <Popup>
                      <strong>
                        {loc.city}, {loc.country}
                      </strong>
                      <br />
                      Active Users: {loc.users}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
          <div className="max-h-[400px] overflow-y-auto border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold">Country</th>
                  <th className="py-2 px-4 text-left font-semibold">City</th>
                  <th className="py-2 px-4 text-left font-semibold">Users</th>
                </tr>
              </thead>
              <tbody>
                {locations.length > 0 ? (
                  locations.map((loc, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{loc.country}</td>
                      <td className="py-2 px-4">{loc.city}</td>
                      <td className="py-2 px-4">{loc.users}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">
                      No real-time user data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
