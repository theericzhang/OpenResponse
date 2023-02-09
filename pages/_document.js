import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <link
                rel="preload"
                href="/fonts/GT-SD-lt-it.otf"
                as="font"
                type="font/otf"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/GT-SD-md-it.otf"
                as="font"
                type="font/otf"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Monaco.ttf"
                as="font"
                type="font/ttf"
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
