import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Category Not found",
      });
    }

    const articles = await Article.find({ catid: id });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Category loaded Successfully",
      category,
      articles,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
