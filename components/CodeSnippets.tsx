export const HeaderCode = `<pre><code class="prettyprint">import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext, useRef } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import ShowCodeButton from "./ShowCodeButton";

let rootDiv: HTMLElement | null;

function NavOptions() {
    return (
        &#x3C;>
            &#x3C;li className="hover:text-dp-back hover:dark:text-ls-fore">
                &#x3C;Link href="/">Home&#x3C;/Link>
            &#x3C;/li>
            &#x3C;li className="hover:text-dp-back hover:dark:text-ls-fore">
                &#x3C;Link href="/skills">Skills&#x3C;/Link>
            &#x3C;/li>
            &#x3C;li className="hover:text-dp-back hover:dark:text-ls-fore">
                &#x3C;Link href="/dapp">dApp&#x3C;/Link>
            &#x3C;/li>
            &#x3C;li className="hover:text-dp-back hover:dark:text-ls-fore">
                &#x3C;Link href="/audits">Audits&#x3C;/Link>
            &#x3C;/li>
        &#x3C;/>
    );
}

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const gitSvg = useRef&#x3C;HTMLImageElement>(null);
    const linkedSvg = useRef&#x3C;HTMLImageElement>(null);
    const themeToggleSvg = useRef&#x3C;HTMLImageElement>(null);
    const menuSvg = useRef&#x3C;HTMLImageElement>(null);
    const sideNav = useRef&#x3C;HTMLDivElement>(null);

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
        &#x3C;div className="bg-gradient-to-r from-lt-fore to-ls-back dark:from-dt-back dark:to-ds-back bg-ls-back text-ls-fore dark:bg-ds-back dark:text-ds-fore">
            &#x3C;nav className="flex items-center flex-nowrap p-3 2xl:px-80 xl:px-60 lg:px-32 drop-shadow-xl">
                &#x3C;div className="flex grow items-center mr-4">
                    &#x3C;span className="font-extrabold text-xl hidden sm:block">
                        &#x3C;Link href="/">CrozierCreative&#x3C;/Link>
                    &#x3C;/span>
                    &#x3C;span className="font-extrabold text-3xl block sm:hidden">
                        &#x3C;Link href="/">CC&#x3C;/Link>
                    &#x3C;/span>
                    &#x3C;div className="flex  ml-3 space-x-2 min-h-fit min-w-fit">
                        &#x3C;a
                            target="_blank"
                            href="https://www.linkedin.com/in/matthew-rampen-7883b5b1/"
                            rel="noopener noreferrer"
                        >
                            &#x3C;Image
                                ref={linkedSvg}
                                src="/linkedin-dark.svg"
                                alt="LinkedIn URL"
                                width={20}
                                height={20}
                            />
                        &#x3C;/a>
                        &#x3C;a
                            target="_blank"
                            href="https://github.com/Rampalamp"
                            rel="noopener noreferrer"
                        >
                            &#x3C;Image
                                ref={gitSvg}
                                src="/github-dark.svg"
                                alt="GitHub URL"
                                width={20}
                                height={20}
                            />
                        &#x3C;/a>
                    &#x3C;/div>
                &#x3C;/div>

                {/**Nav options for medium and up screen sizes */}
                &#x3C;div className="font-bold text-lg mr-1 md:mr-12 hidden sm:block">
                    &#x3C;ul className="flex space-x-5 2xl:space-x-20 xl:space-x-12 lg:space-x-10 md:space-x-8">
                        &#x3C;NavOptions />
                    &#x3C;/ul>
                &#x3C;/div>

                {/**Menu icon for small screen size */}

                &#x3C;div className="flex space-x-3">
                    &#x3C;div className="min-h-fit min-w-fit sm:hidden">
                        &#x3C;button
                            className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                            onClick={toggleSideNav}
                        >
                            &#x3C;Image
                                ref={menuSvg}
                                src="/menu-dark.svg"
                                alt="Menu drop down"
                                width={20}
                                height={20}
                            />
                        &#x3C;/button>
                    &#x3C;/div>
                    &#x3C;div className="min-h-fit min-w-fit">
                        &#x3C;button
                            className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                            onClick={toggleTheme}
                        >
                            &#x3C;Image
                                ref={themeToggleSvg}
                                src="/sun.svg"
                                alt="Theme toggler"
                                width={20}
                                height={20}
                            />
                        &#x3C;/button>
                    &#x3C;/div>
                    &#x3C;div className="min-h-fit min-w-fit">
                        &#x3C;ShowCodeButton codeToShow="header" />
                    &#x3C;/div>
                &#x3C;/div>
            &#x3C;/nav>
            &#x3C;nav className="relative drop-shadow-xl z-10">
                {/**Nav options for small screen format */}
                &#x3C;div
                    ref={sideNav}
                    className="sm:hidden font-bold text-lg absolute top-12 transition-all duration-500 -left-36 left-0"
                >
                    &#x3C;ul className="rounded space-y-10 p-7   bg-gradient-to-b opacity-90 dark:opacity-90 from-ls-back to-lt-fore dark:from-ds-back dark:to-dt-back">
                        &#x3C;NavOptions />
                    &#x3C;/ul>
                &#x3C;/div>
            &#x3C;/nav>
        &#x3C;/div>
    );
}
</code></pre>
`;