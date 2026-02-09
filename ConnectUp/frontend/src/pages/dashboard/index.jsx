import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { createPost, getAllPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";

const Dashboard = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);

  const posts = postState?.posts || [];

  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  /* ================= Fetch Data ================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    if (authState.isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token }));
    }

    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere, authState.all_profiles_fetched, dispatch]);

  /* ================= Helpers ================= */
  const getMediaUrl = (path) => {
    if (!path) return null;
    const cleanPath = path.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${BASE_URL}/${cleanPath}`;
  };

  const handleUpload = async () => {
    if (!postContent && !postImage) return;

    await dispatch(
      createPost({
        body: postContent,
        file: postImage,
      })
    );

    setPostContent("");
    setPostImage(null);
    dispatch(getAllPosts());
  };

  const profilePicture = authState?.user?.userId?.profilePicture
    ? getMediaUrl(authState.user.userId.profilePicture)
    : `${BASE_URL}/default.jpg`;

  /* ================= Loading ================= */
  if (!authState.user) {
    return (
      <UserLayout>
        <DashboardLayout>
          <h3>Loading...</h3>
        </DashboardLayout>
      </UserLayout>
    );
  }

  /* ================= Render ================= */
  return (
    <UserLayout>
      <DashboardLayout>
        {/* ================= Create Post ================= */}
        <div className={styles.scrollComponent}>
          <div className={styles.createPostContainer}>
            <img
              className={styles.userProfile}
              src={profilePicture}
              alt="Profile"
            />

            <textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              hidden
              id="fileUpload"
              onChange={(e) => setPostImage(e.target.files[0])}
            />

            <label htmlFor="fileUpload" className={styles.fab}>
              +
            </label>

            <button className={styles.uploadBtn} onClick={handleUpload}>
              Post
            </button>
          </div>
        </div>

        {/* ================= Posts Feed ================= */}
        <div className={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className={styles.postCard}>
                {/* Header */}
                <div className={styles.postHeader}>
                  <div className={styles.postUserInfo}>
                    <img
                      src={
                        post.userId?.profilePicture
                          ? getMediaUrl(post.userId.profilePicture)
                          : `${BASE_URL}/default.jpg`
                      }
                      className={styles.postUserImage}
                      alt="User"
                    />
                    <div>
                      <h4>{post.userId?.name}</h4>
                      <span>@{post.userId?.username}</span>
                    </div>
                  </div>

                  {/* Delete Icon (UI only) */}
                  {post.userId._id === authState.user.userId._id && (
                    <button className={styles.deleteBtn} title="Delete post">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  )}
                </div>

                {/* Body */}
                <p className={styles.postBody}>{post.body}</p>

                {/* Media */}
                {post.media && (
                  <img
                    src={getMediaUrl(post.media)}
                    className={styles.postImage}
                    alt="Post media"
                  />
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No posts yet</p>
          )}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default Dashboard;
