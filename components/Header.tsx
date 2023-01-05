import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeProvider";

//variables to be reused in useEffect
let rootDiv: HTMLElement | null,
    gitSvg: HTMLElement | null,
    linkedSvg: HTMLElement | null,
    themeToggleSvg: HTMLElement | null,
    menuSvg: HTMLElement | null,
    sideNav: HTMLElement | null;

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

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
        menuSvg === undefined
            ? (menuSvg = document.getElementById("menuSvg"))
            : {};

        sideNav === undefined
            ? (sideNav = document.getElementById("sideNav"))
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

    const toggleSideNav = () => {
        //for some strange reason toggling for left-0 wasn't working
        //toggling -left-36 did work though, not sure why its acting like this.
        sideNav?.classList.toggle("-left-36");
    };

    const mainNavOptions = () => {
        return (
            <>
                <li className="hover:text-dp-back hover:dark:text-ls-fore">
                    <Link href="/skills">Skills</Link>
                </li>
                <li className="hover:text-dp-back hover:dark:text-ls-fore">
                    <Link href="/audits">Audits</Link>
                </li>
                <li className="hover:text-dp-back hover:dark:text-ls-fore">
                    <Link href="/dapp">dApp</Link>
                </li>
            </>
        );
    };

    return (
        <div className="bg-ls-back text-ls-fore dark:bg-ds-back dark:text-ds-fore">
            <nav className=" flex items-center justify-between flex-nowrap p-3 drop-shadow-xl">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <span className="font-extrabold text-xl">
                        <Link href="/">CrozierCreative</Link>
                    </span>
                    <div className="flex ml-3 space-x-2 min-h-fit min-w-fit">
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/matthew-rampen-7883b5b1/"
                            rel="noopener noreferrer"
                        >
                            <Image
                                id="linkedSvg"
                                src="/linkedin-dark.svg"
                                alt="LinkedIn URL"
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

                {/**Nav options for medium and up screen sizes */}
                <div className="font-bold  text-lg hidden sm:block">
                    <ul className="flex space-x-10">{mainNavOptions()}</ul>
                </div>

                {/**Menu icon for small screen size */}
                <div className="flex items-center min-h-fit min-w-fit sm:hidden">
                    <button
                        className="rounded-md p-3 hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-ds-back"
                        onClick={toggleSideNav}
                    >
                        <Image
                            id="menuSvg"
                            src="/menu-dark.svg"
                            alt="Menu drop down"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>

                <div className="flex items-center min-h-fit min-w-fit">
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
            <nav className="relative drop-shadow-xl">
                {/**Nav options for small screen format */}
                <div
                    id="sideNav"
                    className="sm:hidden font-bold text-lg absolute top-12 transition-all duration-500 -left-36 left-0"
                >
                    <ul className="rounded space-y-10 p-7  bg-opacity-75 bg-ds-back">
                        {mainNavOptions()}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
