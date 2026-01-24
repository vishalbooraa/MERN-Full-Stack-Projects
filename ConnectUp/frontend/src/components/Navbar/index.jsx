import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const NavBarComponent = () => {
    const router = useRouter();

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
                    <div
                        className={styles.buttonJoin}
                        onClick={() => router.push("/login")}
                    >
                        <p>Be a part</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBarComponent;
