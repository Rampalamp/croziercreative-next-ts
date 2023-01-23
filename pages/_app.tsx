import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ThemeProvider } from "../components/context/ThemeProvider";
import CodeOverlayProvider from "../components/context/CodeOverlayProvider";
import Head from "next/head";
import CCWeb3Provider from "../components/context/CCWeb3Provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div id="rootDiv" className="font-mono dark">
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

            <CodeOverlayProvider>
                <CCWeb3Provider>
                    {/**Old gradient background setup: bg-gradient-to-bl from-lp-back to-lt-back dark:from-dt-back dark:to-dp-back */}
                    <div className="transition duration-500 overflow-auto flex flex-col w-screen h-screen min-w-[380px] bg-light dark:bg-dark bg-center bg-cover bg-ls-fore dark:bg-ds-back text-lp-fore dark:text-dp-fore">
                        {/**Header Section */}
                        <ThemeProvider>
                            <Header />
                        </ThemeProvider>
                        {/**Main body of app */}

                        <div className="m-auto font-bold text-lg p-3 2xl:px-96 xl:px-72 lg:px-40 md:px-32 sm:px-16 px-6">
                            <Component {...pageProps} />
                        </div>

                        {/**Eventual footer */}
                    </div>
                </CCWeb3Provider>
            </CodeOverlayProvider>
        </div>
    );
}
