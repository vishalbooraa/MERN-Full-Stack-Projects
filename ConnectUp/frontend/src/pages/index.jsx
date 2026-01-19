import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <div className="container">
        <p>ConnectUp Home Page</p>
        <div className="mainContainer">
          <div className="mainContainer-left">

          </div>
          <div className="mainContainer-right">

          </div>

        </div>
      </div>
    </>
  );
}
