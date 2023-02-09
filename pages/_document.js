import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <link
                rel="preload"
                href="/fonts/GT-SD-lt-it.woff2"
                as="font"
                type="font/otf"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/GT-SD-md-it.woff2"
                as="font"
                type="font/otf"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Monaco.woff2"
                as="font"
                type="font/ttf"
                crossOrigin=""
            />
            <Head>
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
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
