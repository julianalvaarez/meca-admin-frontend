/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '10%': '10% 0 0 0',
      },
      width: {
        '40%': '40%',
      },
    },
  },
  plugins: [],
}