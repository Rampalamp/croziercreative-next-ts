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
            //dark tertiary background stone-900
            "dt-back": "#1c1917",
            //dark tertiary foreground violet-100
            "dt-fore": "#ede9fe",
            //dark button hover slate-50
            "dbtn-hov": "#f8fafc",
            //light primary background amber-100
            "lp-back": "#fef3c7",
            //light primary foreground amber-600
            "lp-fore": "#d97706",
            //light secondary background orange-500
            "ls-back": "#f97316",
            //light secondary foreground orange-100
            "ls-fore": "#ffedd5",
            //light tertiary background rose-100
            "lt-back": "#ffe4e6",
            //light tertiary foreground rose-700
            "lt-fore": "#be123c",
            //light button hover orange-50
            "lbtn-hov": "#78716c",
        },
        extend: {},
    },
    plugins: [],
};
