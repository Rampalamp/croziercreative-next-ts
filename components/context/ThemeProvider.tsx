import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

interface IProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC<IProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        let storedTheme: string | null = localStorage.getItem("theme");

        if (!storedTheme) {
            console.log("No theme found. Creating localStorage theme");
            //no theme found in local storage
            const darkTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            const lightTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;
            //check systemTheme value, if true user prefers dark, which is the default for theme provider.
            //so no need to toggle
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
        storedTheme === "dark" ? setTheme("dark") : setTheme("light");
    }, []);

    function toggleTheme() {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
