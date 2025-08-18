import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import User from "@/models/userModel";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { email } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const loggedInUserId = session.user.id;

    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const targetUser = await User.findOne({ email });
    const loggedInUser = await User.findById(loggedInUserId);

    if (!targetUser) {
      return NextResponse.json(
        { message: "Target user not found" },
        { status: 404 }
      );
    }
    if (!loggedInUser) {
      return NextResponse.json(
        { message: "Logged-in user not found" },
        { status: 404 }
      );
    }

    const alreadyFollowing = targetUser.followers.some(
      (f) => f.followerId.toString() === loggedInUserId
    );
    const alreadyInFollowing = loggedInUser.following?.some(
      (f) => f.followingId.toString() === targetUser._id.toString()
    );

    if (alreadyFollowing && alreadyInFollowing) {
      // --- UNFOLLOW ---
      targetUser.followers = targetUser.followers.filter(
        (f) => f.followerId.toString() !== loggedInUserId
      );
      loggedInUser.following = loggedInUser.following.filter(
        (f) => f.followingId.toString() !== targetUser._id.toString()
      );

      await targetUser.save();
      await loggedInUser.save();

      return NextResponse.json({ message: "Unfollowed successfully" });
    } else {
      // --- FOLLOW ---
      targetUser.followers.push({
        followerId: loggedInUserId,
        followedAt: new Date(),
      });

      loggedInUser.following.push({
        followingId: targetUser._id,
        followedAt: new Date(),
      });

      await targetUser.save();
      await loggedInUser.save();

      return NextResponse.json({ message: "Followed successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { email } = await params;

    const session = await getServerSession(authOptions);

    // Always load the target user
    const targetUser = await User.findOne({ email }).select("followers");
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // If not logged in → cannot follow
    if (!session) {
      return NextResponse.json({
        success: true,
        isFollowing: false,
        canFollow: false, // no button
      });
    }

    const loggedInUserId = session.user.id;
    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const isFollowing = targetUser.followers.some(
      (f) => f.followerId.toString() === loggedInUserId
    );

    return NextResponse.json({
      success: true,
      isFollowing,
      canFollow: loggedInUserId !== targetUser._id.toString(), 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
