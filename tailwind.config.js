/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          900: "#0f172a", // dark navy text
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};