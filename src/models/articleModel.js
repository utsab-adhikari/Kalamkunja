import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    viewedAt: {
      type: Date,
      default: Date.now,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: {
      type: String,
    },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    catid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    views: [viewSchema], // ✅ Changed to array of view logs
    publishType: {
      type: String,
      enum: ["draft", "published", "trash", "private"],
      default: "draft",
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article ||
  mongoose.model("Article", articleSchema, "articles");
export default Article;
