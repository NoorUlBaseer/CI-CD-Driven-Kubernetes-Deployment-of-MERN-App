/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc6fb',
          400: '#38a5f6',
          500: '#0071e3',
          600: '#0064d0',
          700: '#0050a8',
          800: '#00448a',
          900: '#003a73',
        },
        secondary: {
          50: '#f2fcfb',
          100: '#d2f6f1',
          200: '#a4ece2',
          300: '#70dace',
          400: '#3fc0b5',
          500: '#20a99c',
          600: '#148880',
          700: '#136c68',
          800: '#115855',
          900: '#104848',
        },
        accent: {
          50: '#fff9ec',
          100: '#fff1d3',
          200: '#ffe0a5',
          300: '#ffc86c',
          400: '#ffab38',
          500: '#ff9010',
          600: '#f77009',
          700: '#d14f0a',
          800: '#ac3d0f',
          900: '#8e3410',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-light': 'pulseLight 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      }
    },
  },
  plugins: [],
}