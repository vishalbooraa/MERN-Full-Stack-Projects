import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const NavBarComponent = () => {
    const router = useRouter();
    const authState = useSelector((state) => state.auth);

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <h1
                    className={styles.logo}
                    onClick={() => router.push("/")}
                >
                    ConnectUp
                </h1>

                <div className={styles.navbarOptionContainer}>
                    {authState.profileFetched ? (
                        <div className={styles.userSection}>
                            <p className={styles.greeting}>
                                Hey, {authState?.user?.userId?.name}
                            </p>
                            <p
                                className={styles.profileLink}
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </p>
                        </div>
                    ) : (
                        <div
                            className={styles.buttonJoin}
                            onClick={() => router.push("/login")}
                        >
                            <p>Be a part</p>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBarComponent;
