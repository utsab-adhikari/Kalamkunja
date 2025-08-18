import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
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

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const session = await getServerSession(authOptions);

    const article = await Article.findOne({ slug });

    if (!article) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Article not found",
      });
    }

    const author = await User.findById(article.authorId);

    if (session.user.id !== author._id) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Only author can update/edit the article",
      });
    }

    await Article.findByIdAndUpdate(article._id, {
      slug: data.slug,
      title: data.title,
      content: data.content,
      featuredImage: data.featuredImage,
      catid: data.catid,
      category: data.category,
    });

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
