import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ThemeProvider } from "../components/context/ThemeProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div id="rootDiv" className="font-mono ">
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
            <div className="flex flex-col w-screen h-screen bg-lp-back text-lp-fore dark:bg-dp-back dark:text-dp-fore">
                {/**Header Section */}
                <ThemeProvider>
                    <Header />
                </ThemeProvider>
                {/**Main body of app */}
                <div className="flex flex-1 items-center justify-center">
                    <Component {...pageProps} />
                </div>
                {/**Eventual footer */}
            </div>
        </div>
    );
}
