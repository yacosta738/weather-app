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
        "lightest-min": "#88869D",
      },
      rotate: {
        "-180": "-180deg",
        "-90": "-90deg",
        "-45": "-45deg",
        0: "0",
        45: "45deg",
        90: "90deg",
        135: "135deg",
        180: "180deg",
        225: "225deg",
        270: "270deg",
        315: "315deg",
      },
      fontSize: {
        '10xl': ['144px', {
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '169px'
        }],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
