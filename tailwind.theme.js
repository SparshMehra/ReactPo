/**
 * Nature-Inspired Color Palette
 * Theme: Natural Burial & Woodland Conservation
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Earth tones for natural burial theme
        earth: {
          50: '#f9f7f4',
          100: '#f0ebe4',
          200: '#e1d7c9',
          300: '#d2c3ae',
          400: '#c3af93',
          500: '#a89578',
          600: '#8d7b5e',
          700: '#6b5d47',
          800: '#4a4031',
          900: '#2a231c',
        },
        // Forest greens
        forest: {
          50: '#f0f9f4',
          100: '#d9f2e3',
          200: '#b3e5c7',
          300: '#7dd4a3',
          400: '#47be7d',
          500: '#2da160',
          600: '#1f7f4a',
          700: '#1a653c',
          800: '#164d2f',
          900: '#113524',
        },
        // Sky/peaceful blues
        peaceful: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#7dbfff',
          400: '#3d9eff',
          500: '#0c7cff',
          600: '#005fd4',
          700: '#0047a3',
          800: '#003272',
          900: '#001f47',
        },
        // Stone grays
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Sunset/memorial
        memorial: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-nature': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-earth': 'linear-gradient(135deg, #a89578 0%, #6b5d47 100%)',
        'gradient-forest': 'linear-gradient(135deg, #2da160 0%, #113524 100%)',
        'gradient-peaceful': 'linear-gradient(135deg, #0c7cff 0%, #001f47 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(45, 161, 96, 0.3)',
        'glow-lg': '0 0 30px rgba(45, 161, 96, 0.4)',
      },
    },
  },
  plugins: [],
};

