import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#000000",
        secondary:{
          DEFAULT:"#3F0071",
          100:"#610094",
          200:"#150050"
        },
        text:"#FAF0E6"
      },
    },
  },
  plugins: [],
} satisfies Config;
