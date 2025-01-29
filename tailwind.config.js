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
      transformOrigin: {
        left: "left",
      },
      transitionProperty: {
        scale: "transform, scaleX",
      },
      colors: {
        primary: "#2F3A58", 
        primaryDark: "#1C273B",
        primaryLight: "#4A5672", 
        secondary: "#E6B800", 
        secondaryDark: "#C59700", 
        secondaryLight: "#F2D966", 
        accent1: "#00A7D0", 
        accent1Dark: "#0088A6",
        accent1Light: "#4FC7E2", 
        accent2: "#F26B38", 
        accent2Dark: "#CC5630", 
        accent2Light: "#F79D7D", 
        neutral: "#B8B8B8",
        dark: "#0B132B",
        light: "#F5F7FA", 
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
        full: "9999px",
      },
      animation: {
        "gradient-move": "gradient-move 6s infinite linear",
        "fade-in": "fade-in 1.5s ease-out",
        "slide-up": "slide-up 1s ease-out",
        bounce: "bounce 1.2s infinite",
        pulse: "pulse 1.5s infinite",
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
  plugins: [typography, aspectRatio, forms],
};
