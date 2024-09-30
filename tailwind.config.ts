import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#7C5DFA",
        secondary: "#9277FF",
        secondaryPale: "#DFE3FA",
        dark1: "#1E2139",
        dark2: "#252945",
        "light-white": "#DFE3FA",
        gray: "#888EB0",
        "btn-hover": "#7E88C3",
        black: "#0C0E16",
        red: "#EC5757",
        "red-hover": "#9277FF",
        "light-bg": "#F8F8FB",
        "dark-hover": "#141625",
      },
      screens: {
        large: { max: "1200px" },
        medium: { max: "605px" },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};

export default config;
