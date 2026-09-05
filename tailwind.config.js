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
        gold: {
          400: '#F5C542',
          500: '#D4AF37',
          600: '#A88A2D',
          700: '#856A1E'
        },
        dark: {
          bg: '#050505',
          surface: '#0D0D0D',
          card: '#151515',
          elevated: '#1B1B1B',
          border: '#262626'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'gold-glow': '0 0 20px -3px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 35px -5px rgba(245, 197, 66, 0.4)'
      }
    },
  },
  plugins: [],
}
