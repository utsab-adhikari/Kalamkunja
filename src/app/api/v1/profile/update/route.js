import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ _id: session.user.id });

    if (!user) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Loaded successful",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Interrnal Server Error",
    });
  }
}

export async function PUT(request) {
  await connectDB();

  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ _id: session.user.id });

    if (!user) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndUpdate(session.user.id, {
      name: data.name,
      image: data.featuredImage,
      bio: data.bio,
      contact: data.contact,
      facebook: data.facebook,
      github: data.github,
    });

    await Article.updateMany({ authorId: user._id }, { author: data.name });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Interrnal Server Error",
    });
  }
}
