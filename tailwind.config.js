/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },

        colors: {
            //dark primary background slate-800
            "dp-back": "#1e293b",
            //dark primary foreground lime-300
            "dp-fore": "#bef264",
            //dark secondary background slate-900
            "ds-back": "#0f172a",
            //dark secondary foreground green-200
            "ds-fore": "#bbf7d0",
            //light primary background sky-50
            "lp-back": "#f0f9ff",
            //light primary foreground blue-700
            "lp-fore": "#1d4ed8",
            //light secondary background blue-300
            "ls-back": "#93c5fd",
            //light secondary foreground indigo-800
            "ls-fore": "#3730a3",
        },
        extend: {},
    },
    plugins: [],
};
