import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       animation: {
        'fade-in': 'fadeIn 1.2s ease-in forwards',
        'slide-left': 'slideInLeft 5s ease-out infinite',
        'slide-right': 'slideInRight 5s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-200%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-200%)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(200%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(200%)' },
        },
    },
  },
},
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
