/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
        colors: {
          brand: {
            primary: '#0F4B65', // Example primary color
            secondary: '#9FBD41', // Example secondary color
            background: '#F5F5F5', // Example background color
            surface: '#FFFFFF', // Example surface color
            text: '#333333', // Example text color
            accent: '#f07e74', // Example accent color
          },
        },
    },
  },
  plugins: [],
}