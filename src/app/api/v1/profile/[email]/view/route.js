import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { email } = await params;
    const { viewerId, ipAddress } = await request.json();

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    user.views.push({
      viewerId: viewerId || null,
      ipAddress: ipAddress || "unknown",
      viewedAt: new Date(),
    });

    await user.save();

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
