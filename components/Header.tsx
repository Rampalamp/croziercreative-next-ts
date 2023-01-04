import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    let gitSvg: HTMLElement | null,
        linkedSvg: HTMLElement | null,
        rootDiv: HTMLElement | null,
        themeToggleSvg: HTMLElement | null;

    useEffect(() => {
        //init elements if required.
        gitSvg === undefined
            ? (gitSvg = document.getElementById("gitSvg"))
            : {};
        linkedSvg === undefined
            ? (linkedSvg = document.getElementById("linkedSvg"))
            : {};
        rootDiv === undefined
            ? (rootDiv = document.getElementById("rootDiv"))
            : {};
        themeToggleSvg === undefined
            ? (themeToggleSvg = document.getElementById("themeToggleSvg"))
            : {};

        //adjust element attributes accordingly.
        if (theme === "dark") {
            rootDiv!.classList.add("dark");
            linkedSvg!.setAttribute("src", "/linkedin-dark.svg");
            gitSvg!.setAttribute("src", "/github-dark.svg");
            themeToggleSvg!.setAttribute("src", "/sun.svg");
        } else {
            rootDiv!.classList.remove("dark");
            linkedSvg!.setAttribute("src", "/linkedin.svg");
            gitSvg!.setAttribute("src", "/github.svg");
            themeToggleSvg!.setAttribute("src", "/moon.svg");
        }
    }, [theme]);

    return (
        <nav className="flex items-center justify-between flex-nowrap p-6 bg-ls-back text-ls-fore dark:bg-ds-back dark:text-ds-fore">
            <div className="flex items-center flex-shrink-0 mr-6">
                <span className="font-extrabold text-xl">
                    <Link href="/">CrozierCreative</Link>
                </span>
                <div className="flex ml-3 space-x-2">
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/matthew-rampen-7883b5b1/"
                        rel="noopener noreferrer"
                    >
                        <Image
                            id="linkedSvg"
                            src="/linkedin-dark.svg"
                            alt="Linked In URL"
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
                            id="gitSvg"
                            src="/github-dark.svg"
                            alt="GitHub URL"
                            width={20}
                            height={20}
                        />
                    </a>
                </div>
            </div>

            <div className="font-bold space-x-4 text-lg">
                <Link href="/skills">Skills</Link>
                <Link href="/audits">Audits</Link>
                <Link href="/dapp">dApp</Link>
            </div>

            <div className="flex space-x-2"></div>
            <div className="flex items-center">
                <button
                    className="rounded-md p-3 hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-ds-back"
                    onClick={toggleTheme}
                >
                    <Image
                        id="themeToggleSvg"
                        src="/sun.svg"
                        alt="Theme toggler"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </nav>
    );
}
