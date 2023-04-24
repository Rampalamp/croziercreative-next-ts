```typescript
import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext, useRef } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import ShowCodeButton from "./ShowCodeButton";
import CCButton from "./CCButton";
import CCMenuIcon from "./CCMenuIcon";
import { NavOptions } from "../constants/Generics";
import CCThemeIcon from "./CCThemeIcon";

let themeIconDiv: HTMLElement | null;
//attempting to useRef the menuSvg was being troublesome so just grabbing it like rootDiv
let menuSvg: HTMLElement | null;

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const gitSvg = useRef<HTMLImageElement>(null);
    const linkedSvg = useRef<HTMLImageElement>(null);
    const sideNav = useRef<HTMLDivElement>(null);

    useEffect(() => {
        menuSvg === undefined
            ? (menuSvg = document.getElementById("burg"))
            : {};
        themeIconDiv === undefined
            ? (themeIconDiv = document.getElementById("ThemeIconDiv"))
            : {};

        //adjust element attributes accordingly.
        if (theme === "dark") {
            linkedSvg.current!.setAttribute("src", "/linkedin-dark.svg");
            gitSvg.current!.setAttribute("src", "/github-dark.svg");
        } else {
            linkedSvg.current!.setAttribute("src", "/linkedin.svg");
            gitSvg.current!.setAttribute("src", "/github.svg");
        }
    }, [theme]);

    function toggleSideNav() {
        //for some strange reason toggling for left-0 wasn't working
        //toggling -left-36 did work though, not sure why its acting like this.
        sideNav.current!.classList.toggle("-left-36");
        //animate the menuSvg on open.
        menuSvg!.classList.toggle("is-opened");
    }

    return (
        <div className="sticky top-0 z-40 w-full text-lt-fore dark:text-ds-fore">
            <nav className=" flex flex-nowrap items-center p-3 drop-shadow-xl backdrop-blur lg:px-32 xl:px-60 2xl:px-80">
                <div className="mr-4 flex grow items-center">
                    <span className="hidden text-xl font-extrabold sm:block">
                        <Link href="/" title="CrozierCreative">
                            CrozierCreative
                        </Link>
                    </span>
                    <span className="block text-3xl font-extrabold sm:hidden">
                        <Link href="/" title="CrozierCreative">
                            CC
                        </Link>
                    </span>
                    <div className="ml-3  flex min-h-fit min-w-fit space-x-2">
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
                                title="LinkedIn."
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
                                title="GitHub"
                            />
                        </a>
                    </div>
                </div>

                {/**Nav options for medium and up screen sizes */}
                <div className="hidden text-lg  font-bold sm:block md:mr-12">
                    <ul className="flex space-x-4 md:space-x-8 lg:space-x-10 xl:space-x-12 2xl:space-x-20">
                        <NavOptions />
                    </ul>
                </div>

                {/**Menu icon for small screen size */}

                <div className="flex space-x-3">
                    <div className="min-h-fit min-w-fit sm:hidden">
                        <CCButton onClick={toggleSideNav} title="Menu">
                            <CCMenuIcon />
                        </CCButton>
                    </div>
                    <div className="min-h-fit min-w-fit">
                        <CCButton
                            onClick={() => {
                                themeIconDiv?.classList.toggle("spinTheme");
                            }}
                            title="ThemeToggle"
                        >
                            {/* CCThemeIcon triggers the toggleTheme function using onAnimationEnd event
                                So toggling spinTheme starts the animation inside CCThemeIcon, which in turn calls toggleTheme
                            */}
                            <CCThemeIcon />
                        </CCButton>
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
                    className="absolute top-12 -left-36 left-0 rounded-md text-lg font-bold backdrop-blur transition-all duration-500 sm:hidden"
                >
                    <ul className="space-y-10 p-7">
                        <NavOptions />
                    </ul>
                </div>
            </nav>
        </div>
    );
}
```
