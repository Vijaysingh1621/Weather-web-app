const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        l4: {
          '0%': { width: '60px', aspectRatio: '4' },
          '100%': { width: '25px', aspectRatio: '1' },
        },
      },
      animation: {
        l4: 'l4 1s infinite alternate',
      },
    },
   
    screens: {
      'sm':{'max': '550px'}, // Custom screen size
      'sn':{'max':'400px'} ,// Another custom screen size
    },
   
  },
 
  
  darkMode: "class",
  plugins: [nextui()]

  
};
