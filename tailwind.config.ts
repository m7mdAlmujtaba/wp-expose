import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        themeBlue800: '#384670',
        themeBlue600: '#5576bb',
        themeBlue500: '#85a9d5',
        themeBlue200: '#ceddef',
        themeBlue50: '#f3f6fb',
        themeYellowOrange: '#FFAA33',
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',

        '1/8': '12.5%',          // 1/8th of the container
        '2/8': '25%',            // 2/8ths of the container
        '3/8': '37.5%',          // 3/8ths of the container
        '4/8': '50%',            // 4/8ths of the container
        '5/8': '62.5%',          // 5/8ths of the container
        '6/8': '75%',            // 6/8ths of the container
        '7/8': '87.5%',          // 7/8ths of the container

        '1/9': '11.1111111%',    // 1/9th of the container
        '2/9': '22.2222222%',    // 2/9ths of the container
        '3/9': '33.3333333%',    // 3/9ths of the container
        '4/9': '44.4444444%',    // 4/9ths of the container
        '5/9': '55.5555556%',    // 5/9ths of the container
        '6/9': '66.6666667%',    // 6/9ths of the container
        '7/9': '77.7777778%',    // 7/9ths of the container
        '8/9': '88.8888889%',    // 8/9ths of the container

        '1/10': '10%',            // 1/10th of the container
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      animation: {
        rotate: 'rotate 10s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(360deg) scale(10)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
