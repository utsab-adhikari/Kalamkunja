import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, "name email avatar");
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
