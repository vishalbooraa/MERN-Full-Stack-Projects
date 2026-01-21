import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const NavBarComponent = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <h1 onClick={()=>{
                    router.push("/")
                }} style={{cursor:"pointer"}}>ConnectUp</h1>
                 <div className={styles.navbarOptionContainer}>
                    <div onClick={()=>{
                        router.push("/login")
                    }} className={styles.buttonJoin}>
                        <p>Be a part</p>
                    </div>
                 </div>
            </nav>
        </div>
    );
}

export default NavBarComponent;
