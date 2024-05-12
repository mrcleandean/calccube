/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'calc-cube': 'spin 10s infinite',
      },
      colors: {
        loader: "#11151c",
      }
    },
  },
  plugins: [],
}

