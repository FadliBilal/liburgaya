/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menambahkan font Inter sebagai font utama
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}