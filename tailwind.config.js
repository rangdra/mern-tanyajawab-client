const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        cyan: colors.cyan,
        fuchsia: colors.fuchsia,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
