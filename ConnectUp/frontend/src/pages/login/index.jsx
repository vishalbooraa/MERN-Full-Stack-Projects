import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from "./style.module.css";

const LoginComponent = () => {

    const loggedIn = useSelector(state => state.auth.loggedIn);
    const router = useRouter();

    const [userLoginMethod, setUserLoginMethod] = useState(true);

    useEffect(() => {
        if (loggedIn) {
            router.push("/dashboard");
        }
    }, [loggedIn, router]);

    return (
        <UserLayout>
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    <div className={styles.cardContainerLeft}>
                        <p className={styles.cardLeftHeading}>
                            {userLoginMethod ? "Sign In" : "Sign Up"}
                        </p>

                        <div className={styles.inputContainers}>
                            <div className={styles.inputRow}>
                                <input className={styles.inputField} type="text" placeholder='Username' />
                                <input className={styles.inputField} type="text" placeholder='Name' />
                            </div>

                            <input className={styles.inputField} type="email" placeholder='Email' />
                            <input className={styles.inputField} type="password" placeholder='Password' />

                            <div
                                className={styles.buttonWithOutline}
                                onClick={() => setUserLoginMethod(!userLoginMethod)}
                            >
                                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cardContainerRight}></div>
                </div>
            </div>
        </UserLayout>
    );
};

export default LoginComponent;
