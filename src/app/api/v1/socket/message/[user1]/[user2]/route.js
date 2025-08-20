import connectDB from "@/db/ConnectDB";
import Message from "@/models/messageModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { user1, user2 } = await params;

  if (!user1 || !user2) {
    return NextResponse.json({ error: "Missing users" }, { status: 400 });
  }

  try {
    await connectDB();
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });

    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
