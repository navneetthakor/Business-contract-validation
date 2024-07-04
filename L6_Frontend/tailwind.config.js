/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4B70F5',
        secondary: '#4C3BCF',
        bgPrimary: '#E1E2E1',
        bgSecondary: '#F5F5F6',
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4B70F5",        /* Your primary color */
          "secondary": "#4C3BCF",      /* Your secondary color */
          "accent": "#F5F5F6",         /* Your accent color */
          "neutral": "#3d4451",        /* Your neutral color */
          "base-100": "#FFFFFF",       /* Background color */
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}


