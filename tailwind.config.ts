import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF5EC',
          200: '#F3E8D5',
        },
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#B8962B',
          700: '#94761C',
        },
        emerald: {
          800: '#1B3B2B',
          900: '#12261C',
          950: '#0B1711',
        },
        maroon: {
          800: '#5C1D24',
          900: '#3D1217',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
