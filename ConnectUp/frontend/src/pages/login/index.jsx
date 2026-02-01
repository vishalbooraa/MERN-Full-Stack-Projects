import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

const LoginComponent = () => {
  const { loggedIn, message, isLoading, isError } = useSelector(
    (state) => state.auth,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (loggedIn) {
      router.push("/dashboard");
    }
  }, [loggedIn]);

  useEffect(() => {
    dispatch(emptyMessage());
  }, [userLoginMethod]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/dashboard")
    }
  },[])

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (userLoginMethod) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ username, password, email, name }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setName("");
  };

  const toggleLoginMethod = () => {
    clearForm();
    setUserLoginMethod(!userLoginMethod);
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainerLeft}>
            <p className={styles.cardLeftHeading}>
              {userLoginMethod ? "Welcome Back" : "Create Account"}
            </p>
            <p className={styles.cardLeftSubtitle}>
              {userLoginMethod ? "Sign in to your account" : "Sign up to get started"}
            </p>

            <div className={styles.message} style={{ color: isError ? "red" : "green" }}>
              {message}
            </div>

            <form className={styles.inputContainers} onSubmit={handleSubmit}>
              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                    value={username}
                    required={!userLoginMethod}
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.inputField}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    required={!userLoginMethod}
                  />
                </div>
              )}

              <input
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.inputField}
                type="email"
                placeholder="Email Address"
                value={email}
                required
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.inputField}
                type="password"
                placeholder="Password"
                value={password}
                required
              />

              <button
                type="submit"
                className={`${styles.buttonWithOutline} ${isLoading ? styles.buttonLoading : ''}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : userLoginMethod ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Mobile Toggle Section */}
              <div className={styles.mobileToggle}>
                <p className={styles.mobileToggleText}>
                  {userLoginMethod
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <div
                  className={`${styles.buttonWithOutline} ${styles.mobileToggleButton}`}
                  onClick={toggleLoginMethod}
                >
                  <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
                </div>
              </div>
            </form>
          </div>

          {/* Desktop Right Section */}
          <div className={styles.cardContainerRight}>
            <div className={styles.rightContent}>
              <p>
                {userLoginMethod
                  ? "Don't Have an Account?"
                  : "Already Have an Account?"}
              </p>
              <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>
                {userLoginMethod
                  ? "Create an account to get started with all our features"
                  : "Sign in to access your account and continue your journey"}
              </p>
              <div
                className={styles.buttonWithOutline}
                onClick={toggleLoginMethod}
              >
                <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default LoginComponent;