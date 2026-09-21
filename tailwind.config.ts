import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["IBM Plex Sans Arabic", "Cairo", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        brand: ["Cinzel", "Cormorant Garamond", "serif"],
      },
      colors: {
        ink: "#1A1614",
        cream: "#F7F0EB",
        camel: "#C4A574",
        ecru: "#E8DCC8",
        burgundy: {
          50: "#F8F1F3",
          100: "#EBD7DC",
          500: "#8B4553",
          600: "#733844",
          700: "#5C2C36",
          900: "#3A1C22",
        },
      },
    },
  },
  plugins: [],
};

export default config;
