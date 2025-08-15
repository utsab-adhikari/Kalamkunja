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

const followersSchema = new mongoose.Schema(
  {
    followedAt: {
      type: Date,
      default: Date.now,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  { _id: false }
);
const followingSchema = new mongoose.Schema(
  {
    followedAt: {
      type: Date,
      default: Date.now,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: {
      type: String,
    },
    image: String,
    role: { type: String, enum: ["user", "admin", "creator"], default: "user" },
    badge: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    contact: {
      type: Number,
    },
    facebook: {
      type: String,
    },
    github: {
      type: String,
    },
    views: [viewSchema],
    followers: [followersSchema],
    following: [followingSchema],
    verifyToken: String,
    verifyTokenExpiresAt: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpireesAt: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
