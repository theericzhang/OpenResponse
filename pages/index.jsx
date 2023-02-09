/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Logo from "../components/elements/branding/Logo";
import Dialogue from "../components/elements/dialoguebox/Dialogue";
import Footer from "../components/elements/branding/Footer";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>OpenResponse</title>
                <meta
                    name="description"
                    content="OpenResponse, a GPT-3 Prompt-Completion client built with Next.js and OpenAI"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@anericzhang" />
                <meta name="twitter:title" content="OpenResponse, a GPT-3 Prompt-Completion client" />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content="https://raw.githubusercontent.com/theericzhang/OpenResponse/main/public/twittercardimage.png" />
                <link rel="icon" href="/ico.svg" />
            </Head>

            <main className={styles.main} data-testid="main">
                <Logo />
                <Dialogue />
            </main>
            <Footer />
        </div>
    );
}
