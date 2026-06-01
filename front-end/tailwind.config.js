/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "secundary-color":"#721011",
        "hover":"#8A1A20",
        "bodyColor":"#E5E5E5",
        "dominateColor":"#ffff",
        "gray":"#ccc"
      }
    },
  },
  plugins: [daisyui],
  daisyui:{
    theme:['dark','coffe','light']
  }
}