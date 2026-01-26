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

  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (loggedIn) {
      router.push("/dashboard");
    }
  }, [loggedIn]);

  useEffect(()=>{
    dispatch(emptyMessage())
  },[userLoginMethod])

  const handleLogin=()=>{
    dispatch(loginUser({email,password}))
  }

  const handleRegister = () => {
    console.log("registering");
    dispatch(registerUser({ username, password, email, name }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainerLeft}>
            <p className={styles.cardLeftHeading}>
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>
            <p style={{ color: isError ? "red" : "green" }}>{message}</p>

            <div className={styles.inputContainers}>
              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Name"
                  />
                </div>
              )}

              <input
                onChange={(e) => SetEmail(e.target.value)}
                className={styles.inputField}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => SetPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />

              <div
                className={styles.buttonWithOutline}
                onClick={() => {
                  if (userLoginMethod) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
              >
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContainerRight}>
           <div>
             {userLoginMethod? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p>}
            <div
              className={styles.buttonWithOutline}
              onClick={() => {
                setUserLoginMethod(!userLoginMethod)
              }}
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
