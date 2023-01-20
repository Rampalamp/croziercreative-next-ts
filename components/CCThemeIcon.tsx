import { useContext, useRef } from "react";
import { Moon, Sun } from "../constants/Svgs";
import { ThemeContext } from "./context/ThemeProvider";

interface ICCThemeIconProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {}

export default function CCThemeIcon({}: ICCThemeIconProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const divRef = useRef<HTMLDivElement>(null);

    function handleAnimationEnd() {
        divRef.current!.classList.toggle("spinTheme");
        toggleTheme();
    }
    return (
        <div
            id="ThemeIconDiv"
            ref={divRef}
            onAnimationEnd={handleAnimationEnd}
            className="h-[20px] w-[20px]"
        >
            {theme === "dark" ? <Sun /> : <Moon />}
        </div>
    );
}
