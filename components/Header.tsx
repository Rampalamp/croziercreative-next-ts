import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext, useRef } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import ShowCodeButton from "./ShowCodeButton";

let rootDiv: HTMLElement | null;

function NavOptions() {
    return (
        <>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/">Home</Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/skills">Skills</Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/dapp">dApp</Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/audits">Audits</Link>
            </li>
        </>
    );
}

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const gitSvg = useRef<HTMLImageElement>(null);
    const linkedSvg = useRef<HTMLImageElement>(null);
    const themeToggleSvg = useRef<HTMLImageElement>(null);
    const menuSvg = useRef<HTMLImageElement>(null);
    const sideNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        rootDiv === undefined
            ? (rootDiv = document.getElementById("rootDiv"))
            : {};

        //adjust element attributes accordingly.
        if (theme === "dark") {
            rootDiv!.classList.add("dark");
            linkedSvg.current!.setAttribute("src", "/linkedin-dark.svg");
            gitSvg.current!.setAttribute("src", "/github-dark.svg");
            menuSvg.current!.setAttribute("src", "menu-dark.svg");
            themeToggleSvg.current!.setAttribute("src", "/sun.svg");
        } else {
            rootDiv!.classList.remove("dark");
            linkedSvg.current!.setAttribute("src", "/linkedin.svg");
            gitSvg.current!.setAttribute("src", "/github.svg");
            menuSvg.current!.setAttribute("src", "menu.svg");
            themeToggleSvg.current!.setAttribute("src", "/moon.svg");
        }
    }, [theme]);

    function toggleSideNav() {
        //for some strange reason toggling for left-0 wasn't working
        //toggling -left-36 did work though, not sure why its acting like this.
        sideNav.current!.classList.toggle("-left-36");
    }

    return (
        <div className="sticky top-0 z-40 w-full text-lt-fore dark:text-ds-fore">
            <nav className=" backdrop-blur flex items-center flex-nowrap p-3 2xl:px-80 xl:px-60 lg:px-32 drop-shadow-xl">
                <div className="flex grow items-center mr-4">
                    <span className="font-extrabold text-xl hidden sm:block">
                        <Link href="/">CrozierCreative</Link>
                    </span>
                    <span className="font-extrabold text-3xl block sm:hidden">
                        <Link href="/">CC</Link>
                    </span>
                    <div className="flex  ml-3 space-x-2 min-h-fit min-w-fit">
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/matthew-rampen-7883b5b1/"
                            rel="noopener noreferrer"
                        >
                            <Image
                                ref={linkedSvg}
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
                                ref={gitSvg}
                                src="/github-dark.svg"
                                alt="GitHub URL"
                                width={20}
                                height={20}
                            />
                        </a>
                    </div>
                </div>

                {/**Nav options for medium and up screen sizes */}
                <div className="font-bold text-lg  md:mr-12 hidden sm:block">
                    <ul className="flex 2xl:space-x-20 xl:space-x-12 lg:space-x-10 md:space-x-8 space-x-4">
                        <NavOptions />
                    </ul>
                </div>

                {/**Menu icon for small screen size */}

                <div className="flex space-x-3">
                    <div className="min-h-fit min-w-fit sm:hidden">
                        <button
                            className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                            onClick={toggleSideNav}
                        >
                            <Image
                                ref={menuSvg}
                                src="/menu-dark.svg"
                                alt="Menu drop down"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    <div className="min-h-fit min-w-fit">
                        <button
                            className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                            onClick={toggleTheme}
                        >
                            <Image
                                ref={themeToggleSvg}
                                src="/sun.svg"
                                alt="Theme toggler"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    <div className="min-h-fit min-w-fit">
                        <ShowCodeButton codeToShow="header" />
                    </div>
                </div>
            </nav>
            <nav className="relative">
                {/**Nav options for small screen format */}
                <div
                    ref={sideNav}
                    className="rounded-md backdrop-blur sm:hidden font-bold text-lg absolute top-12 transition-all duration-500 -left-36 left-0"
                >
                    <ul className="space-y-10 p-7">
                        <NavOptions />
                    </ul>
                </div>
            </nav>
        </div>
    );
}
