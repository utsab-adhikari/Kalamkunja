// src/app/api/admin/analytic/route.js
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const analytics = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  try {
    const prop = `properties/${process.env.GA_PROPERTY_ID}`;

    // --- Real-time Active Users ---
    const [rt] = await analytics.runRealtimeReport({
      property: prop,
      metrics: [{ name: "activeUsers" }],
      dimensions: [{ name: "country" }, { name: "city" }],
    });

    // --- Page Views Last 7 Days ---
    const [pv] = await analytics.runReport({
      property: prop,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "screenPageViews" }],
      dimensions: [{ name: "pagePath" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10, // Top 10 pages
    });

    // --- Overall Summary Metrics Last 7 Days ---
    const [summary] = await analytics.runReport({
      property: prop,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [
        { name: "newUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    });

    // --- Device Category Usage Last 7 Days ---
    const [device] = await analytics.runReport({
      property: prop,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
      dimensions: [{ name: "deviceCategory" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    });

    // --- Traffic Source Last 7 Days ---
    const [source] = await analytics.runReport({
      property: prop,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
      dimensions: [{ name: "sessionSource" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 10, // Top 10 sources
    });


    return NextResponse.json({
      realtime: rt,
      pages: pv,
      summary: summary,
      device: device,
      source: source,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
