import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        const userTheme: string | null = localStorage.getItem("theme");

        if (userTheme) {
            //set new theme value in localStorage
            localStorage.setItem("theme", theme);
        } else {
            //no theme found in local storage
            const systemTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            //check systemTheme value, if true user prefers dark, which is the default for theme provider.
            //so no need to toggle
            systemTheme
                ? localStorage.setItem("theme", "dark")
                : () => {
                      localStorage.setItem("theme", "light");
                      //toggle the theme if prefer light
                      toggleTheme();
                  };
        }
        //set rootDiv accordingly with dark class or not.
        theme === "dark"
            ? document.getElementById("rootDiv")?.classList.add("dark")
            : document.getElementById("rootDiv")?.classList.remove("dark");
    }, [theme]);

    return (
        <nav className="flex items-center justify-between flex-nowrap p-6 bg-ls-back text-ls-fore dark:bg-ds-back dark:text-ds-fore">
            <div className="flex items-center flex-shrink-0 mr-6">
                <span className="">
                    <Link href="/">CrozierCreative</Link>
                </span>
            </div>

            <div>
                <Link href="/skills">Skills</Link>
                <Link href="/audits">Audits</Link>
                <Link href="/dapp">dApp</Link>
            </div>

            <div>
                <Link href="/linkedin">LI</Link>
                <Link href="/github">GIT</Link>
            </div>
            <div className="flex items-center">
                <div
                    onClick={() => {
                        toggleTheme();
                    }}
                >
                    <Image
                        className="sun"
                        src="./public/sun.svg"
                        alt="Light mode toggle"
                        width={20}
                        height={20}
                    />
                </div>

                <div
                    onClick={() => {
                        toggleTheme();
                    }}
                >
                    <Image
                        className="moon"
                        src="./public/moon.svg"
                        alt="Dark mode toggle"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </nav>
    );
}
