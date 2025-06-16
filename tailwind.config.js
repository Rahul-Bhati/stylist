/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        WorkSansSemibold: ["WorkSans-Semibold", "sans-serif"],
        WorkSansRegular: ["WorkSans-Regular", "sans-serif"],
        WorkSansBold: ["WorkSans-Bold", "sans-serif"],
        WorkSansMedium: ["WorkSans-Medium", "sans-serif"],
        ThunderThin: ["Thunder-Thin", "sans-serif"],
        ThunderBold: ["Thunder-Bold", "sans-serif"],
        ThunderSemiBold: ["Thunder-SemiBold", "sans-serif"],
        ThunderMedium: ["Thunder-Medium", "sans-serif"],
      },
      colors: {
        "primary": "#e0492e",
        "orange": "#e09845",
        "light-grey": "#747474",
        "dark-grey": "#3e3e3e",
        "secondary": "#191919"
      }
    },
  },
  plugins: [],
}