/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // CSS Custom Properties matching base app
      CSS: {
        ':root': {
          '--primary': '#3b82f6',
          '--secondary': '#06b6d4',
          '--accent': '#10b981',
          '--bg': '#ffffff',
          '--text': '#1e293b',
          '--text-light': '#475569',
          '--border': '#e2e8f0',
          '--gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
          '--gradient-hero': 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)',
          '--space-4': '1rem',
          '--space-6': '1.5rem',
          '--space-8': '2rem',
          '--transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        }
      },
      colors: {
        // Base app color palette
        primary: '#2563eb',
        'primary-dark': '#1e40af',
        'primary-light': '#3b82f6',
        secondary: '#0891b2',
        accent: '#059669',
        'accent-light': '#10b981',
        success: '#059669',
        'success-light': '#10b981',
        danger: '#dc2626',
        'danger-light': '#ef4444',
        warning: '#d97706',
        'warning-light': '#f59e0b',
        info: '#2563eb',
        'info-light': '#3b82f6',
        
        // Neutral colors
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8fafc',
        'bg-tertiary': '#f1f5f9',
        'card-bg': '#ffffff',
        text: '#0f172a',
        'text-light': '#1e293b',
        'text-tertiary': '#475569',
        'text-inverse': '#ffffff',
        border: '#e2e8f0',
        'border-secondary': '#cbd5e1',
        'border-tertiary': '#f1f5f9',
      },
      fontFamily: {
        sans: ['Sora', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['0.9rem', { lineHeight: '1.7' }],
        'lg': ['1rem', { lineHeight: '1.7' }],
        'xl': ['1.125rem', { lineHeight: '1.6' }],
        '2xl': ['1.25rem', { lineHeight: '1.5' }],
        '3xl': ['1.5rem', { lineHeight: '1.4' }],
        '4xl': ['2rem', { lineHeight: '1.3' }],
        '5xl': ['2.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        'px': '1px',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)',
        'glow-strong': '0 0 30px rgba(37, 99, 235, 0.25)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
        'gradient-success': 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-hero': 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)',
        'beacon-gradient': 'linear-gradient(135deg, #2563eb 0%, #0891b2 50%, #059669 100%)',
      },
      animation: {
        'ripple': 'ripple-animation 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        'ripple-animation': {
          to: {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        pulse: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.1' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: '0.2' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}