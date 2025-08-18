import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Article from "@/models/articleModel";
import User from "@/models/userModel";

export async function GET(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const id = session.user.id;

    const allArticles = await Article.find(
      { authorId: id },
      "title publishType createdAt updatedAt likes views featuredImage slug"
    );

    const user = await User.findById(id);
    const profileViews = user.views.length;

    const articles = {
      published: [],
      draft: [],
      trash: [],
    };

    let totalLikes = 0;
    let totalViews = 0;
    let totalBlogs = 0;

    for (const article of allArticles) {
      if (articles[article.publishType]) {
        articles[article.publishType].push(article);
      }

      if (article.publishType === "published") {
        totalBlogs++;
        totalLikes += article.likes || 0;
        totalViews += article.views.length || 0;
      }
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Dashboard loaded",
      totals: {
        totalLikes,
        totalViews,
        totalBlogs,
      },
      articles,
      profileViews,
    });

  } catch (error) {
    console.error("GET /dashboard error:", error.message);

    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
