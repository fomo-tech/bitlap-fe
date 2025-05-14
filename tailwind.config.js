/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        5: "5rem"
      },
      spacing: {
        '5': '5rem',
        '6': '6rem',
        "7": "7rem"
      }
    },
  },
  plugins: [],
}

