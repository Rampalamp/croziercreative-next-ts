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
            //dark secondary foreground green-300
            "ds-fore": "#86efac",
            //dark tertiary background stone-900
            "dt-back": "#1c1917",
            //dark tertiary foreground violet-300
            "dt-fore": "#c4b5fd",
            //light primary background amber-100
            "lp-back": "#fef3c7",
            //light primary foreground amber-700
            "lp-fore": "#92400e",
            //light secondary background orange-500
            "ls-back": "#f97316",
            //light secondary foreground orange-50
            "ls-fore": "#fff7ed",
            //light tertiary background rose-100
            "lt-back": "#ffe4e6",
            //light tertiary foreground rose-800
            "lt-fore": "#9f1239",
        },
        extend: {
            backgroundImage: {
                //OG grabbed from https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif
                //modified with GIMP for both dark/light
                dark: "url('/back-dark.avif')",
                light: "url('/back-light.avif')",
            },
            boxShadow: {
                cust: "3px 5px 2px rgba(0, 0, 0, / 0)",
                "dark-hover": "3px 5px 2px rgb(153 204 255 / 0.4)",
            },
        },
    },
};
