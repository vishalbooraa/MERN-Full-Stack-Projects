import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import UserLayout from "@/layout/UserLayout";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ConnectUp | Home</title>
        <meta name="description" content="A true social media platform" />
      </Head>

      <UserLayout>
        <div className={styles.container}>
          <div className={styles.mainContainer}>

            <div className={styles.mainContainerLeft}>
              <p>Connect with friends without exaggeration</p>
              <p>A true social media platform, with stories — no bluffs!</p>

              <div
                className={styles.buttonJoin}
                onClick={() => router.push("/login")}
              >
                <p>Join Now</p>
              </div>
            </div>

            <div className={styles.mainContainerRight}>
              <Image
                src="/images/connection.avif"
                alt="Connection Illustration"
                width={500}
                height={500}
                priority
              />
            </div>

          </div>
        </div>
      </UserLayout>
    </>
  );
}
