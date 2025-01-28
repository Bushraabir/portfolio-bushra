/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';

export default {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}", // Includes all potential files
    ],
    theme: {
        extend: {
            transformOrigin: {
                left: "left",
            },
            transitionProperty: {
                scale: "transform, scaleX",
            },
            textGradient: {
                gradient:
                  'text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFC857] to-[#FF5733]',
              },
              
            colors: {
                primary: "#2F3A58", // Slate Blue
                primaryDark: "#1C273B", // Darker shade of primary
                primaryLight: "#4A5672", // Lighter tint of primary
                secondary: "#E6B800", // Golden Yellow
                secondaryDark: "#C59700", // Darker shade of secondary
                secondaryLight: "#F2D966", // Lighter tint of secondary
                accent1: "#00A7D0", // Bright Turquoise
                accent1Dark: "#0088A6", // Darker shade of accent1
                accent1Light: "#4FC7E2", // Lighter tint of accent1
                accent2: "#F26B38", // Soft Coral
                accent2Dark: "#CC5630", // Darker shade of accent2
                accent2Light: "#F79D7D", // Lighter tint of accent2
                neutral: "#B8B8B8", // Cool Gray
                dark: "#0B132B", // Deep Navy
                light: "#F5F7FA", // Light Gray
            },
            boxShadow: {
                xl: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',
                '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
                '3xl': '0 35px 60px rgba(0, 0, 0, 0.2)', 
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'], // Modern sans-serif for headings
                serif: ['Playfair Display', 'serif'], // Elegant serif for emphasis
                mono: ['Source Code Pro', 'monospace'], // Monospace for code
            },
            fontSize: {
                xxs: '0.65rem', // Extra small font for subtle elements
                '4xl': '2.5rem', // Slightly larger for headings
                '5xl': '3rem', // For larger hero titles
                '6xl': '4rem', // Extra large for bold hero titles
            },
            spacing: {
                72: '18rem',
                84: '21rem',
                96: '24rem',
                128: '32rem', // For larger paddings/margins
            },
            borderRadius: {
                lg: '0.5rem',
                xl: '1rem', // For smoother corners
                '2xl': '1.5rem',
                '3xl': '2rem',
                full: '9999px', // For fully circular shapes
            },
            
            animation: {
                'fade-in': 'fade-in 1.5s ease-out',
                'slide-up': 'slide-up 1s ease-out',
                bounce: 'bounce 1.2s infinite',
                pulse: 'pulse 1.5s infinite',
            },
            
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulse: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
        },
    },
    plugins: [
        typography,
        aspectRatio,
        forms,
    ],
};