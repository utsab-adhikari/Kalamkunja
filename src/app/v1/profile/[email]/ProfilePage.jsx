"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaFacebook, FaGithub, FaThumbsUp, FaWhatsapp } from "react-icons/fa";
import { FiEdit2, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function ProfilePage({ email }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [canFollow, setCanFollow] = useState(false);
  const [activeTab, setActiveTab] = useState("articles");

  const currentUserEmail = session?.user?.email;

  // Fetch profile & articles
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/profile/${email}`);
      if (res.data.success) {
        setProfile(res.data.user);
        setArticles(res.data.articles);
        setError("");
        recordView(email);
      } else {
        setError(res.data.message || "Failed to load profile");
      }
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const recordView = async (email) => {
      try {
        const viewerId = session?.user?.id || null;
        const ipAddress = await getIPAddress();
  
        await axios.post(`/api/v1/profile/${email}/view`, {
          viewerId,
          ipAddress,
        });
      } catch (err) {
        console.error("Failed to record view:", err);
      }
    };
  
    const getIPAddress = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        return res.data.ip;
      } catch {
        return "unknown";
      }
    };

  // Fetch follow status separately
  const fetchFollowStatus = async () => {
    if (!session) {
      setIsFollowing(false);
      setCanFollow(false);
      return;
    }
    try {
      const res = await axios.get(`/api/v1/follow/${email}`);
      if (res.data.success) {
        setIsFollowing(res.data.isFollowing);
        setCanFollow(res.data.canFollow);
      }
    } catch (err) {
      console.error("Error fetching follow status:", err);
      setIsFollowing(false);
      setCanFollow(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchProfile();
    }
  }, [email]);

  useEffect(() => {
    if (email && session) {
      fetchFollowStatus();
    } else {
      setIsFollowing(false);
      setCanFollow(false);
    }
  }, [email, session]);

  // Follow/unfollow toggle for main profile
  const handleFollowToggle = async () => {
    if (!profile) return;
    try {
      const res = await axios.put(`/api/v1/follow/${profile.email}`);
      if (res.status === 200) {
        // Toggle local follow state immediately
        setIsFollowing((prev) => !prev);
        // Update followers count locally
        setProfile((prev) => ({
          ...prev,
          followersCount: isFollowing
            ? (prev.followersCount || 1) - 1
            : (prev.followersCount || 0) + 1,
          followers: isFollowing
            ? prev.followers.filter(
                (f) => f.followerId.email !== currentUserEmail
              )
            : [
                ...(prev.followers || []),
                {
                  followerId: {
                    email: currentUserEmail,
                    name: session.user.name,
                    image: session.user.image,
                  },
                },
              ],
        }));
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  // Follow/unfollow inside followers/following lists
  const handleFollowToggleUser = async (
    targetEmail,
    currentlyFollowing,
    listType
  ) => {
    try {
      const res = await axios.put(`/api/v1/follow/${targetEmail}`);
      if (res.status === 200) {
        // Update local profile followers/following arrays and counts
        setProfile((prev) => {
          if (!prev) return prev;

          // Update followers list if current user is target's follower
          let newFollowers = [...(prev.followers || [])];
          let newFollowing = [...(prev.following || [])];
          let newFollowersCount = prev.followersCount || 0;
          let newFollowingCount = prev.followingCount || 0;

          if (listType === "followers") {
            // The current user is followed by these people
            if (!currentlyFollowing) {
              // We now follow back the follower
              // Add to following list:
              newFollowing.push({ followingId: { email: targetEmail } });
              newFollowingCount++;
            } else {
              // Unfollow that user
              newFollowing = newFollowing.filter(
                (f) => f.followingId.email !== targetEmail
              );
              newFollowingCount = Math.max(newFollowingCount - 1, 0);
            }
          } else if (listType === "following") {
            // The current user is following these people
            if (currentlyFollowing) {
              // Unfollow the user
              newFollowing = newFollowing.filter(
                (f) => f.followingId.email !== targetEmail
              );
              newFollowingCount = Math.max(newFollowingCount - 1, 0);
            } else {
              // Follow the user (unlikely but let's handle)
              newFollowing.push({ followingId: { email: targetEmail } });
              newFollowingCount++;
            }
          }

          return {
            ...prev,
            following: newFollowing,
            followingCount: newFollowingCount,
            followers: newFollowers,
            followersCount: newFollowersCount,
          };
        });
      }
    } catch (error) {
      console.error("Error following/unfollowing user in list:", error);
    }
  };

  const isOwner = session?.user?.email === profile?.email;

  const contacts = [
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      url: profile?.contact ? `https://wa.me/${profile.contact}` : null,
      show: !!profile?.contact,
    },
    {
      icon: <FiMail />,
      label: "Email",
      url: `mailto:${profile?.email}`,
      show: !!profile?.email,
    },
    {
      icon: <FaFacebook />,
      label: "Facebook",
      url: profile?.facebook,
      show: !!profile?.facebook,
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      url: profile?.github,
      show: !!profile?.github,
    },
  ];

  const truncateContent = (content, maxLines = 2) => {
    if (!content) return "";
    const lines = content.split("\n").slice(0, maxLines);
    return (
      lines.join(" ") + (content.split("\n").length > maxLines ? "..." : "")
    );
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const isFollowingUser = (targetEmail) => {
    return profile?.following?.some((f) => f.followingId.email === targetEmail);
  };

  const handleNavigateProfile = (email) => {
    router.push(`/v1/profile/${email}`);
  };

  if (status === "loading" || loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 bg-red-100 text-red-700 rounded text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 bg-gray-100 rounded text-center">
        <p>No profile found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* Profile Info */}
      <div className="flex flex-col items-center text-center space-y-4">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-600 cursor-pointer"
            onClick={() => handleNavigateProfile(profile.email)}
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-semibold text-gray-600 cursor-pointer"
            onClick={() => handleNavigateProfile(profile.email)}
          >
            {profile.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        <h1
          className="text-3xl font-semibold text-gray-900 cursor-pointer"
          onClick={() => handleNavigateProfile(profile.email)}
        >
          {profile.name}
        </h1>
        {profile.bio && <p className="text-gray-600">{profile.bio}</p>}

        {/* Social Links */}
        <div className="flex space-x-6 mt-3">
          {contacts.map(
            ({ icon, label, url, show }) =>
              show && (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="text-gray-700 hover:text-blue-600 text-2xl"
                >
                  {icon}
                </a>
              )
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>
            <strong>{profile.followersCount || 0}</strong> Followers
          </span>
          <span>
            <strong>{profile.followingCount || 0}</strong> Following
          </span>
          <span>
            <strong>{articles.length}</strong> Articles
          </span>
        </div>

        {/* Follow / Unfollow */}
        {status && status === "authenticated" && !isOwner && canFollow && (
          <button
            onClick={handleFollowToggle}
            className={`mt-4 px-6 py-2 rounded-md font-semibold transition ${
              isFollowing
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {/* Update button for owner */}
        {isOwner && (
          <button
            onClick={() => router.push("/v1/profile/update")}
            className="mt-4 px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiEdit2 className="inline mr-2" /> Update Profile
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b">
        <nav className="flex gap-6">
          <button
            className={`pb-2 ${
              activeTab === "articles" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("articles")}
          >
            Articles
          </button>
          <button
            className={`pb-2 ${
              activeTab === "followers" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          {isOwner && (
            <button
              className={`pb-2 ${
                activeTab === "following" ? "border-b-2 border-blue-600" : ""
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          )}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "articles" && (
          <>
            {articles?.length ? (
              <div className="flex flex-col">
                {articles.map((article) => (
                  <div
                    key={article._id}
                    onClick={() => router.push(`/v1/articles/${article.slug}`)}
                    className="cursor-pointer border border-gray-200 bg-white flex my-5 flex-col shadow hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
                  >
                    {/* Featured Image */}
                    <div
                      className="h-48 bg-cover bg-center border-b border-gray-200"
                      style={{
                        backgroundImage: `url(${
                          article.featuredImage ||
                          "https://via.placeholder.com/600x300?text=No+Image"
                        })`,
                      }}
                    />

                    {/* Article Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="mb-3 font-semibold text-lg text-gray-900">
                        {article.title}
                      </h3>

                      {article.content && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {truncateContent(article.content)}
                        </p>
                      )}

                      <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
                        <p>
                          {article.author || "Unknown Author"} •{" "}
                          {formatDate(article.createdAt)}
                        </p>

                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <FaThumbsUp /> {article.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye /> {article.views?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No articles published.</p>
            )}
          </>
        )}

        {activeTab === "followers" && (
          <>
            {profile.followers?.length > 0 ? (
              <ul className="space-y-2">
                {profile.followers.map(({ followerId }) => {
                  const followingBack = isFollowingUser(followerId.email);
                  const isCurrentUser = followerId.email === currentUserEmail;

                  return (
                    <li
                      key={followerId._id || followerId.email}
                      className="flex items-center gap-3 justify-between"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleNavigateProfile(followerId.email)}
                      >
                        <img
                          src={followerId.image || "/default-avatar.png"}
                          alt={followerId.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{followerId.name}</span>
                      </div>
                      {status === "authenticated" &&
                        isOwner &&
                        !isCurrentUser && (
                          <button
                            onClick={() =>
                              handleFollowToggleUser(
                                followerId.email,
                                followingBack,
                                "followers"
                              )
                            }
                            className={`px-3 py-1 rounded-md font-semibold text-sm transition ${
                              followingBack
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {followingBack ? "Unfollow" : "Follow Back"}
                          </button>
                        )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No followers yet.</p>
            )}
          </>
        )}

        {activeTab === "following" && isOwner && (
          <>
            {profile.following?.length > 0 ? (
              <ul className="space-y-2">
                {profile.following.map(({ followingId }) => (
                  <li
                    key={followingId._id || followingId.email}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleNavigateProfile(followingId.email)}
                    >
                      <img
                        src={followingId.image || "/default-avatar.png"}
                        alt={followingId.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{followingId.name}</span>
                    </div>
                    <button
                      onClick={() =>
                        handleFollowToggleUser(
                          followingId.email,
                          true,
                          "following"
                        )
                      }
                      className="px-3 py-1 rounded-md font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Unfollow
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You are not following anyone.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const ArticleCard = ({ article }) => {
  return (
    <Link
      href={`/v1/articles/${article.slug}`}
      className="p-2 border shadow-sm hover:shadow-md transition bg-white relative"
    >
      {/* Article Content */}
      <div className="flex gap-3">
        {article?.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-16 h-16 object-cover "
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{article.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "No date"}
          </p>
          {article.updatedAt && (
            <p className="text-xs text-gray-400 mt-1">
              Updated: {new Date(article.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
