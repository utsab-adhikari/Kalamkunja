import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AiArticle from "@/models/aiArticleModel";

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const savedItems = await AiArticle.find({ author: session.user.id });

    return NextResponse.json({
        status: 200,
        success: true,
        articles: savedItems
    });
  } catch (error) {
    console.error("Error fetching saved items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
