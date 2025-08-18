import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const article = await Article.findOne({ slug });

    const author = await User.findById(article.authorId);
    if (!article) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Article not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      article,
      author,
    });
  } catch (error) {
    console.error("Article fetch error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
