/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gbBlack: "rgba(1, 1, 0, 1)",
      },
    },
  },
  plugins: [],
};
