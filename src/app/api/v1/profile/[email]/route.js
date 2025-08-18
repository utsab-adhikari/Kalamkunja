import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { email } = await params;

    // Find the user and populate both followers & following
    const user = await User.findOne({ email })
      .populate("followers.followerId", "name email image")
      .populate("following.followingId", "name email image");

    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Profile not found",
      });
    }

    // Fetch published articles
    const articles = await Article.find({
      authorId: user._id,
      publishType: "published",
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Profile loaded successfully",
      user: {
        ...user.toObject(),
        followersCount: user.followers.length,
        followingCount: user.following?.length || 0,
      },
      articles,
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
