/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jira: {
          // Ana renkler
          primary: '#0052CC',
          'primary-light': '#4C9AFF',
          'primary-hover': '#0065FF',
          
          // Arka plan renkleri - Light
          'page-light': '#F4F5F7',
          'bg-card-light': '#FFFFFF',
          'bg-hover-light': '#F4F5F7',
          
          // Arka plan renkleri - Dark
          'page-dark': '#1D1F23',
          'bg-card-dark': '#2D3137',
          'bg-hover-dark': '#383C44',
          
          // Kenarlık renkleri
          'border-light': '#E3E3E380',
          'border-dark': '#404348',
          
          // Metin renkleri - Light
          'text-primary-light': '#172B4D',
          'text-secondary-light': '#5E6C84',
          
          // Metin renkleri - Dark
          'text-primary-dark': '#FFFFFF',
          'text-secondary-dark': '#A1A7B4',
          
          // Overlay ve Backdrop renkleri
          'overlay-light': 'rgba(0, 0, 0, 0.05)',
          'overlay-dark': 'rgba(0, 0, 0, 0.3)',
          'backdrop-dark': 'rgba(23, 43, 77, 0.7)',
          
          // Durum renkleri
          'status-error': '#E34935',
          'status-error-hover': '#C9372C',
          'status-warning': '#FFAB00',
          'status-success': '#36B37E',
          
          // Gradient renkleri
          'gradient-start-light': '#F4F5F7',
          'gradient-end-light': '#FFFFFF',
          'gradient-start-dark': '#1D1F23',
          'gradient-end-dark': '#2D3137'
        }
      },
      boxShadow: {
        jira: {
          sm: '0 1px 4px rgba(0, 0, 0, 0.15)',
          md: '0 3px 6px rgba(0, 0, 0, 0.2)',
          lg: '0 8px 16px rgba(0, 0, 0, 0.25)',
          'dark-sm': '0 1px 4px rgba(0, 0, 0, 0.3)',
          'dark-md': '0 3px 6px rgba(0, 0, 0, 0.4)',
          'dark-lg': '0 8px 16px rgba(0, 0, 0, 0.5)'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out'
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
} 