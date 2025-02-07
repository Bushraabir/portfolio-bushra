/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      strokeWidth: {
        2: '2px',
      },
      transformOrigin: {
        left: "left",
      },
      transitionProperty: {
        scale: "transform, scaleX",
      },
      colors: {
        lemon_chiffon: { DEFAULT: '#fbf8cc', 500: '#fbf8cc', 700: '#fefef5' },
        champagne_pink: { DEFAULT: '#fde4cf', 500: '#fde4cf', 700: '#fff9f5' },
        tea_rose: { DEFAULT: '#ffcfd2', 500: '#ffcfd2', 700: '#fff6f6' },
        pink_lavender: { DEFAULT: '#f1c0e8', 500: '#f1c0e8', 700: '#fcf2fa' },
        mauve: { DEFAULT: '#cfbaf0', 500: '#cfbaf0', 700: '#f6f2fc' },
        jordy_blue: { DEFAULT: '#a3c4f3', 500: '#a3c4f3', 700: '#edf3fd' },
        non_photo_blue: { DEFAULT: '#90dbf4', 500: '#90dbf4', 700: '#e9f8fd' },
        electric_blue: { DEFAULT: '#8eecf5', 500: '#8eecf5', 700: '#e8fbfd' },
        aquamarine: { DEFAULT: '#98f5e1', 500: '#98f5e1', 700: '#ebfdf9' },
        deep_indigo: { DEFAULT: '#2a1b3d', 500: '#2a1b3d', 700: '#1d142b' },
        dark_teal: { DEFAULT: '#1d3557', 500: '#1d3557', 700: '#16263e' },
      },
      boxShadow: {
        xl: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        "3xl": "0 35px 60px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["Source Code Pro", "monospace"],
      },
      fontSize: {
        xxs: "0.65rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        128: "32rem",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "5rem",
        full: "9999px",
      },
      animation: {
        "gradient-move": "gradient-move 6s infinite linear",
        "fade-in": "fade-in 1.5s ease-out",
        "slide-up": "slide-up 1s ease-out",
        bounce: "bounce 1.2s infinite",
        pulse: "pulse 1.5s infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [
    typography,
    aspectRatio,
    forms,
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '2px #E6B800',
        },
      });
    },
  ],
};
