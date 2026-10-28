/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#07080a',
        night: '#0c0d12',
        card: '#12141c',
        cardHover: '#181b26',
        gold: {
          300: '#f5df9a',
          400: '#e5c46b',
          500: '#c5a059',
          600: '#9b7a37',
          700: '#755823',
        },
        ivory: '#f0ede6',
        parchment: '#e2ded5',
        moniyan: '#2563eb',
        abyss: '#dc2626',
        lightborn: '#eab308',
        aberleen: '#9333ea',
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Cinzel Decorative"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(197, 160, 89, 0.15)',
        goldGlow: '0 0 35px rgba(229, 196, 107, 0.25)',
        abyssGlow: '0 0 35px rgba(220, 38, 38, 0.25)',
        moniyanGlow: '0 0 35px rgba(37, 99, 235, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
