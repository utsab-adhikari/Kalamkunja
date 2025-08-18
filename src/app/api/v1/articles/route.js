import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  try {
    const articles = await Article.find({ publishType: "published" }).sort({
      createdAt: -1,
    });

    if (!articles) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Articles not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Articles loaded",
      articles,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Interrnal Server Error",
    });
  }
}
