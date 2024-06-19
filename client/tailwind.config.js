/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        castoro: ["Castoro"],
        anonymous: ["Anonymous Pro"],
        inter: ["Inter"],
        catamaran: ["Catamaran"],
      },
    },
  },
  plugins: [],
};
