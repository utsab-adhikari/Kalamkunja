import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({})
    return NextResponse.json({
      status: 200,
      success: true,
      message: "users loaded successfully",
      users,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
