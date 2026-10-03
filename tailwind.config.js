/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#05060A",
        panel: "#0A0C14",
        line: "rgba(255, 255, 255, 0.12)",
        paper: "#ECEDF3",
        mute: "#8B90A6",
        accent: "#6C7BFF",
        "accent-soft": "#9AA5FF",
      },
      fontFamily: {
        sans: ['"Sora Variable"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        display: "0.16em",
      },
    },
  },
  plugins: [],
};
