import { Darker_Grotesque } from "@next/font/google";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

interface ProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        let storedTheme: string | null = localStorage.getItem("theme");

        if (!storedTheme) {
            console.log("No theme found. Creating localStorage theme");
            //no theme found in local storage
            const systemTheme: boolean = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            //check systemTheme value, if true user prefers dark, which is the default for theme provider.
            //so no need to toggle
            if (systemTheme) {
                localStorage.setItem("theme", "dark");
                storedTheme = "dark";
            } else {
                localStorage.setItem("theme", "light");
                storedTheme = "light";
            }
        }
        storedTheme === "dark" ? setTheme("dark") : setTheme("light");
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
