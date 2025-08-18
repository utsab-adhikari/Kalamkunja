import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await connectDB();
  try {
    const { articleId } = await request.json();

    await Article.findByIdAndUpdate(articleId, {
      publishType: "published",
    });

    return NextResponse.json({
      success: true,
      status: 201,
      message: "Article published",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
