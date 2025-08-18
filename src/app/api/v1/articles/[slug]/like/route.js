import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params; 
    const { userId } = await request.json();

    const article = await Article.findOne({ slug });

    if (!article) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Article not found",
      });
    }

    let liked = false;

    // Ensure ObjectId is compared correctly
    const userIdStr = String(userId);
    const userIndex = article.likedBy.findIndex(
      (id) => String(id) === userIdStr
    );

    if (userIndex === -1) {
      // 👍 Like
      article.likedBy.push(userId);
      article.likes += 1;
      liked = true;
    } else {
      // 👎 Unlike
      article.likedBy.splice(userIndex, 1);
      article.likes -= 1;
      liked = false;
    }

    await article.save();

    return NextResponse.json({
      success: true,
      status: 200,
      liked,
      likes: article.likes,
      likedBy: article.likedBy,
    });
  } catch (error) {
    console.error("Like action error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
}
