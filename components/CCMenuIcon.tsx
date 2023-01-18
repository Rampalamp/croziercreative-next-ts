import { Theme } from "./context/ThemeProvider";

interface ICCMenuIconProps {
    theme: Theme;
}

export default function CCMenuIcon({ theme }: ICCMenuIconProps) {
    let strokeColor: string;

    theme === "dark" ? (strokeColor = "#86efac") : (strokeColor = "#9f1239");

    return (
        <svg stroke={strokeColor} className="hamburger" id="burg">
            <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--top"
            />
            <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--mid"
            />
            <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--bot"
            />
        </svg>
    );
}
