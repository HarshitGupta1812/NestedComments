/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111111',
        'dark-card': '#1a1a1a',
        'brand-accent': '#3b82f6', // A nice blue
        'brand-accent-hover': '#2563eb',
      },
    },
  },
  plugins: [],
};