import React, { useEffect } from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAboutUser } from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config";
import styles from "./index.module.css";
import { useRouter } from "next/router";

const DiscoverPage = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch current logged-in user info if not already in state
    if (!authState.user) {
      dispatch(getAboutUser({ token }));
    }

    // Fetch all profiles if not already fetched
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.user, authState.all_profiles_fetched, dispatch]);

  const getProfilePicture = (path) => {
    if (!path) return `${BASE_URL}/default.jpg`;
    return `${BASE_URL}/${path.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  };

  return (
    <UserLayout>
      <DashboardLayout>
        <h1 className={styles.title}>Discover</h1>

        <div className={styles.profilesContainer}>
          {authState.all_profiles_fetched &&
            authState.all_users
              .filter(
                (profile) =>
                  profile &&
                  profile.userId &&
                  profile.userId._id !== authState.user?.userId?._id // exclude current user
              )
              .map((profile) => (
                <div onClick={()=>{
                    router.push(`/view_profile/${profile.userId?.username || "unknown"}`);
                }} key={profile._id} className={styles.profileCard}>
                  <img
                    src={getProfilePicture(profile.userId?.profilePicture)}
                    alt={profile.userId?.name || "User"}
                    className={styles.profileImage}
                  />
                  <div className={styles.profileInfo}>
                    <p className={styles.profileName}>
                      {profile.userId?.name || "Unknown"}
                    </p>
                    <p className={styles.profileUsername}>
                      @{profile.userId?.username || "unknown"}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default DiscoverPage;
