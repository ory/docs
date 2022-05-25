
module.exports = {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: "#5528ff",
        secondary: "#FFCA05",
        danger: "#9a3412",
        error: "#991b1b",
        success: "#166534",
      },
      boxShadow: {
        auth: "0px 0px 16px 0px rgba(107,114,128,0.66)",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
