module.exports = {
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-red": "#FE5E48",
        "dark-red": "#C33C1E",
        "main-bg": "#373743",
        "dark-bg": "#212429",
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  daisyui: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
