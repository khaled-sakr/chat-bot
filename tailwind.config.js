/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Define an extra small screen size
        sm: "640px", // Default Tailwind `sm`
        md: "768px", // Default Tailwind `md`
        lg: "1024px", // Default Tailwind `lg`
        xl: "1280px", // Default Tailwind `xl`
        "2xl": "1536px", // Default Tailwind `2xl`
      },
    },
  },
  plugins: [],
};
