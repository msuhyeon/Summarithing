import { Config } from 'tailwindcss';

const config: Config = {
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
