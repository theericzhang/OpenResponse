/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../components/elements/branding/Logo";
import LandingContent from "../components/content/LandingContent";
import Dialogue from "../components/elements/dialoguebox/Dialogue";
import Footer from "../components/elements/branding/Footer";
import styles from "../styles/Home.module.css";

export default function Home() {
    
    const [ isPromptViewOpen, setIsPromptViewOpen ] = useState(false);
    console.log('loading');
    
    return (
        <div className={styles.container}>
            <Head>
                <title>OpenResponse</title>
                <meta
                    name="OpenResponse is an AI prompt-completion client"
                    content="OpenResponse, a GPT-3 Prompt-Completion client built with Next.js and OpenAI"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@anericzhang" />
                <meta name="twitter:title" content="OpenResponse, a GPT-3 Prompt-Completion client" />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content="https://raw.githubusercontent.com/theericzhang/OpenResponse/main/public/twittercardimage.png" />
                <link rel="icon" href="/ico.svg" />
            </Head>

            <main className={styles.main}>
                <Logo />
                {/* {!isPromptViewOpen && <LandingContent isPromptViewOpen={isPromptViewOpen} setIsPromptViewOpen={setIsPromptViewOpen}/>}
                {isPromptViewOpen && <Dialogue />} */}
                <Dialogue />
            </main>
            <Footer />
        </div>
    );
}
