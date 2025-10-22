/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        // Brand colors - luxury meets cutting-edge
        deep: '#0A0D12',
        ink: {
          DEFAULT: '#0F1218',
          soft: '#2D3441',
          lighter: '#5A6478',
        },
        champagne: {
          DEFAULT: '#D4AF37',
          light: '#E6C547',
          dark: '#B8941F',
        },
        platinum: '#C0C0C0',
        bronze: '#CD7F32',
        copper: '#B87333',
        
        // Neutral colors - refined and modern
        paper: '#FAFBFC',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8F9FA',
          elevated: '#FFFFFF',
        },
        divider: {
          DEFAULT: '#E2E8F0',
          subtle: '#F1F5F9',
        },
        
        // Status colors - refined
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        
        // Legacy colors for compatibility
        brand: {
          900: '#0e1524',
          800: '#142034',
          700: '#1b2a45',
          600: '#233858',
          500: '#2e4a75',
          400: '#59719a',
          DEFAULT: '#0F172A',
          light: '#1E293B',
          accent: '#475569',
        },
        sand: '#f7f3ee',
        line: '#e5e7eb',
      },
    },
  },
  plugins: [],
};