import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
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

            <div className="flex space-x-2">
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/matthew-rampen-7883b5b1/"
                    rel="noopener noreferrer"
                >
                    <Image
                        className="sun"
                        src="/linkedin.svg"
                        alt="Light mode toggle"
                        width={20}
                        height={20}
                    />
                </a>
                <a
                    target="_blank"
                    href="https://github.com/Rampalamp"
                    rel="noopener noreferrer"
                >
                    <Image
                        className="sun"
                        src="/github.svg"
                        alt="Github"
                        width={20}
                        height={20}
                    />
                </a>
            </div>
            <div className="flex items-center">
                {theme === "dark" ? (
                    <button
                        className="bg-ls-back dark:bg-ds-back hover:bg-dbtn-hov hover:bg-opacity-50 rounded-md p-3"
                        onClick={toggleTheme}
                    >
                        <Image
                            className="sun"
                            src="/sun.svg"
                            alt="Light mode toggle"
                            width={20}
                            height={20}
                        />
                    </button>
                ) : (
                    <button
                        className="bg-ls-back dark:bg-ds-back hover:bg-lbtn-hov hover:bg-opacity-50 rounded-md p-3"
                        onClick={toggleTheme}
                    >
                        <Image
                            className="moon"
                            src="/moon.svg"
                            alt="Dark mode toggle"
                            width={20}
                            height={20}
                        />
                    </button>
                )}
            </div>
        </nav>
    );
}
