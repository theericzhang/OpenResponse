import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <link
                rel="preload"
                href="/fonts/GT-SD-lt-it.woff2"
                as="font"
                type="font/woff2"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/GT-SD-md-it.woff2"
                as="font"
                type="font/woff2"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Monaco.woff2"
                as="font"
                type="font/woff2"
                crossOrigin=""
            />
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
