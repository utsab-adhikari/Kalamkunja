import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});

    const authorsWithArticles = await Article.distinct("authorId");

    const profiles = users
      .map((user) => ({
        ...user.toObject(),
        profile: authorsWithArticles.some(
          (authorId) => authorId.toString() === user._id.toString()
        ),
      }));

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Users loaded successfully",
      users: profiles,
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
