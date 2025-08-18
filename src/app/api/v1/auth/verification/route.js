// /api/v1/auth/verification/route.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { htmlVerify } from "@/utils/emailPage";
import sendEmail from "@/utils/sendEmail";

export async function GET() {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    // Generate a plain token
    const plainToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing
    const hashedToken = await bcrypt.hash(plainToken, 10);

    user.verifyToken = hashedToken;
    user.verifyTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 5 min
    await user.save();

    const html = htmlVerify(plainToken);
    console.log(session.user.email)
    await sendEmail(session.user.email, "Verify Your Email - Kalamkunja", html);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Verification email sent",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
