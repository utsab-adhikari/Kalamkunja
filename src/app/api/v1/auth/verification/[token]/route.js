// /api/v1/auth/verification/[token]/route.js
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { htmlWelcome } from "@/utils/emailPage";
import { sendEmailWelcome } from "@/utils/sendEmail";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { token } = await params;
    if (!token) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Token missing",
      });
    }

    const user = await User.findOne({
      verifyToken: { $exists: true },
      verifyTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid or expired token",
      });
    }

    const isValid = await bcrypt.compare(token, user.verifyToken);
    if (!isValid) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid token",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiresAt = undefined;
    await user.save();

    const Name = user.name;

    const html = htmlWelcome(Name);
    await sendEmailWelcome(
      user.email,
      "Welcome to Kalamkunja - Explore The Core",
      html
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Email verified successfully",
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
