import connectDB from "@/db/ConnectDB";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});

    return NextResponse.json({
      status: 200,
      success: true,
      categories,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { category, description } = await request.json();

    if (!category) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({ category });

    if (existingCategory) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new Category({ category, description });
    await newCategory.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Category ID is required",
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Category not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}