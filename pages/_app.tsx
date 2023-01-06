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
            <div className="flex flex-col w-screen h-screen min-w-[380px] bg-lp-back text-lp-fore dark:bg-dp-back dark:text-dp-fore">
                {/**Header Section */}
                <ThemeProvider>
                    <Header />
                </ThemeProvider>
                {/**Main body of app */}
                <div className="flex flex-1 overflow-auto items-center justify-center font-bold text-lg p-3 2xl:px-96 xl:px-72 lg:px-40 md:px-32 sm:px-16 px-6">
                    <Component {...pageProps} />
                </div>
                {/**Eventual footer */}
            </div>
        </div>
    );
}
