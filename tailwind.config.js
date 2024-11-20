/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        antonio: ['Antonio', 'sans-serif'],
        spartan: ['Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
