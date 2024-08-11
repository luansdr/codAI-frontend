const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bright-turquoise': {
          '50': '#e7fff9',
          '100': '#c6ffee',
          '200': '#92ffe4',
          '300': '#4dffdb',
          '400': '#00ffcc',
          '500': '#00e8b7',
          '600': '#00be97',
          '700': '#00987e',
          '800': '#007865',
          '900': '#006254',
          '950': '#003831',
        },
        'science-blue': {
          '50': '#f1f7fe',
          '100': '#e1eefd',
          '200': '#bddbfa',
          '300': '#82bef7',
          '400': '#409ef0',
          '500': '#1782e0',
          '600': '#0a66c2',
          '700': '#09509b',
          '800': '#0c4480',
          '900': '#103b6a',
          '950': '#0b2546',
      },
      
        'sulu': {
          '50': '#effce9',
          '100': '#ddf8cf',
          '200': '#b6f09c',
          '300': '#93e670',
          '400': '#6dd744',
          '500': '#4dbd25',
          '600': '#39961a',
          '700': '#2d7318',
          '800': '#275b19',
          '900': '#244e19',
          '950': '#0e2b08',
        },

        'malibu': {
          '50': '#f1fafe',
          '100': '#e1f4fd',
          '200': '#bdeafa',
          '300': '#82dbf7',
          '400': '#40c9f0',
          '500': '#17b3e0',
          '600': '#0a91bf',
          '700': '#09739b',
          '800': '#0c6280',
          '900': '#10516a',
          '950': '#0b3346',
        },

        blackcodai: {
          '50': '#f4f7f7',
          '100': '#e3e9ea',
          '200': '#cbd4d6',
          '300': '#a6b6ba',
          '400': '#7b9195',
          '500': '#60767a',
          '600': '#526368',
          '700': '#465358',
          '800': '#3f474b',
          '900': '#373e42',
          '950': '#0d0f10',
        },

        woodsmoke: {
          50: '#f4f6f7',
          100: '#e2e8eb',
          200: '#c9d3d8',
          300: '#a3b4bd',
          400: '#768d9a',
          500: '#5b727f',
          600: '#4e606c',
          700: '#44505a',
          800: '#3d464d',
          900: '#363d43',
          950: '#131619',
        },
        'shark': {
          '50': '#f4f6f7',
          '100': '#e3e7ea',
          '200': '#cad2d7',
          '300': '#a5b2bb',
          '400': '#798a97',
          '500': '#5e6f7c',
          '600': '#505e6a',
          '700': '#454f59',
          '800': '#3e454c',
          '900': '#373c42',
          '950': '#1a1d21',
        },

      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
