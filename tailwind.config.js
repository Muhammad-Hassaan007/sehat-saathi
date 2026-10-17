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
        healthify: {
          cream: '#FAF7F2',
          creamLight: '#FCFAF7',
          creamDark: '#F0EBE1',
          olive: '#4B5E38',
          oliveLight: '#657B4F',
          oliveDark: '#38482A',
          oliveDeep: '#26331C',
          terracotta: '#D27339',
          terracottaHover: '#BD622B',
          coral: '#E78B5D',
          peach: '#FBEAE0',
          dark: '#1C231A',
        },
        brand: {
          50: '#F2F8F4',
          100: '#E4F1E7',
          200: '#C8E4CF',
          300: '#9ECDAB',
          400: '#6EB281',
          500: '#489D54',
          600: '#3A8244',
          700: '#2F6736',
          800: '#28532D',
          900: '#224426',
        },
        surface: {
          light: '#F8FAF8',
          card: '#FFFFFF',
          cardMuted: '#F4F7F4',
          dark: '#121814',
        },
        emergency: {
          light: '#FEE2E2',
          DEFAULT: '#DC2626',
          dark: '#991B1B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 117, 60, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(72, 157, 84, 0.45)',
        'emergency': '0 0 30px rgba(220, 38, 38, 0.5)',
      }
    },
  },
  plugins: [],
}
