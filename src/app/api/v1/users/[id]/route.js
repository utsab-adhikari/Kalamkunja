import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(_, { params }) {
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "Invalid user id",
    });
  }

  try {
    await connectDB();
    const deleted = await User.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }
    return NextResponse.json({
      status: 200,
      success: trtue,
      message: "User deleted",
      data: deleted,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function PUT(_, { params }) {
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "Invalid user id",
    });
  }

  try {
    await connectDB();
    const updated = await User.findByIdAndUpdate(id, {
      isVerified: true,
    });
    if (!updated) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }
    return NextResponse.json({
      status: 200,
      success: trtue,
      message: "User updated",
      data: deleted,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
