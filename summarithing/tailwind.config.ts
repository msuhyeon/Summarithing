import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbit: ['Orbit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
