import { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

interface IProviderProps {
    children: React.ReactNode;
}

let rootDiv: HTMLElement | null;

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC<IProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        let storedTheme: string | null = localStorage.getItem("theme");
        rootDiv === undefined
            ? (rootDiv = document.getElementById("rootDiv"))
            : {};

        if (!storedTheme) {
            console.log("No theme found. Creating localStorage theme");
            //no theme found in local storage
            const darkTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            const lightTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;
            //check systemTheme value, if true user prefers dark
            if (darkTheme) {
                localStorage.setItem("theme", "dark");
                storedTheme = "dark";
            } else if (lightTheme) {
                localStorage.setItem("theme", "light");
                storedTheme = "light";
            } else {
                //default dark if none are true
                localStorage.setItem("theme", "dark");
                storedTheme = "dark";
            }
        }
        //set base theme
        setTheme(storedTheme as Theme);

        //check value of storedTheme, website starts with dark, therefore if storedTheme is light, remove dark, if not, leave it.
        //cant use classList.toggle below because useEffect runs twice on start up, thus resulting in the rootDiv the 'dark' class assigned incorrectly.
        storedTheme === "light" ? rootDiv!.classList.remove("dark") : {};
    }, []);

    function toggleTheme() {
        if (theme === "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
        rootDiv!.classList.toggle("dark");
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
