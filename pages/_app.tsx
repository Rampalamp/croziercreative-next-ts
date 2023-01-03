import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ThemeProvider } from "../components/context/ThemeProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div id="rootDiv">
            <Head>
                <title>Crozier Creative</title>
                <meta
                    name="description"
                    content="The website of Crozier Creative"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider>
                <Header />
            </ThemeProvider>
            <div className="bg-lp-back text-lp-fore dark:bg-dp-back dark:text-dp-fore h-screen">
                <Component {...pageProps} />
            </div>
        </div>
    );
}
