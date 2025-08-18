import connectDB from "@/db/ConnectDB";
import View from "@/models/viewsModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { viewerId, ipAddress, pathname } = await request.json();

    const view = View({
      viewerId: viewerId || null,
      ipAddress: ipAddress || "unknown",
      viewedAt: new Date(),
      pathname: pathname,
    });

    await view.save();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "View recorded successfully",
    });
  } catch (error) {
    console.error("View recording error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
}
