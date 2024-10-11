import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                fadeIn: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(100px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0px)",
                    },
                },
                fadeOut: {
                    "0%": {
                        opacity: "1",
                        transform: "translateX(0px)",
                    },
                    "100%": {
                        opacity: "0",
                        transform: "translateX(100px)",
                    },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.2s ease-out",
                fadeOut: "fadeOut 0.2s ease-out",
            },
        },
    },
    plugins: [],
};
export default config;
