// src/app/api/v1/admin/route.js
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import View from "@/models/viewsModel";

export async function GET(request) {
  try {
    await connectDB();

    const articles = await Article.find({});
    const users = await User.find({});
    const views = await View.find({});

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success",
      users: users.length || 0,
      articles: articles.length || 0,
      views: views.length || 0,
    });
  } catch (error) {
    console.error("GET /api/v1/admin error:", error.message);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
