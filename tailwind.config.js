module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#100E1D",
        secondary: "#1E213A",
        tertiary: "#E7E7EB",
        lightest: "#A09FB1",
        "lightest-min": "#88869D"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
