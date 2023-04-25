import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ThemeProvider } from "../components/context/ThemeProvider";
import CodeOverlayProvider from "../components/context/CodeOverlayProvider";
import Head from "next/head";
import CCWeb3Provider from "../components/context/CCWeb3Provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div id="rootDiv" className="dark font-mono">
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
                    <div className="flex h-screen w-screen min-w-[280px] flex-col overflow-auto bg-ls-fore bg-light bg-cover bg-center text-lp-fore transition duration-500 dark:bg-ds-back dark:bg-dark dark:text-dp-fore">
                        {/**Header Section */}
                        <ThemeProvider>
                            <Header />
                        </ThemeProvider>
                        {/**Main body of app */}

                        <div className="m-auto p-3 px-6 text-lg font-bold sm:px-16 md:px-32 lg:px-40 xl:px-72 2xl:px-96">
                            <Component {...pageProps} />
                        </div>

                        {/**Eventual footer */}
                    </div>
                </CCWeb3Provider>
            </CodeOverlayProvider>
        </div>
    );
}
