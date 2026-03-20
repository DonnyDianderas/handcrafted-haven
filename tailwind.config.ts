import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      //// For now, I'm keeping the tutorial grid. I might need it for the dashboard charts as I develop the project.
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      
      colors: {
        // CONECTAMOS CON LAS VARIABLES DE TU GLOBAL.CSS
        background: 'var(--background)', 
        foreground: 'var(--foreground)', 
        primary: {
          DEFAULT: 'var(--primary)', 
          foreground: 'var(--primary-foreground)',
        },
        secondary: 'var(--secondary)', 
        accent: {
          DEFAULT: 'var(--accent)', 
          foreground: 'var(--accent-foreground)',
        },
        border: 'var(--border)', 
      },
      
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
      },
      // Gotta keep the shimmer keyframes for the loading skeletons.
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  // The forms plugin is a must-have for the product forms I'm building
  plugins: [require('@tailwindcss/forms')],
};

export default config;