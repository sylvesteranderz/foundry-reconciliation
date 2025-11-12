/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        roboto: 'Roboto',
        barlow: 'Barlow',
        'public-sans': 'Public Sans',
        inter: 'Inter',
      },
      fontSize: {
        base: '14px',
        sm: '13px',
        xs: '11px',
        '3xl': '28px',
      },
      backgroundColor: {
        primaryBgColor: '#e4eef0',
      },
      colors: {
        'primary-black': '#16232a',
        danger: '#ef4444',
        'primary-white': '#E5E7EB',
        'primary-gray': '#e4eef0',
        'secondary-gray': '#e4eef0',
        'primary-green': '#075056',
        'primary-cct': '#075056',
        'primary-dark': '#16232a',
        secondary: '#075056',
        ash: 'rgba(224, 230, 233, 0.3)',
        'nav-ash': 'rgba(94, 104, 113, 1)',
        'kyc-alert-yellow': 'rgba(249, 180, 0, 1)',
        'ash-text': 'rgba(146, 146, 146, 1)',
        'range-ash': 'rgba(232, 234, 237, 1)',
        'edit-tab-border': 'rgba(54, 56, 64, 0.7)',
        'edit-tab-text': 'rgba(88, 88, 88, 1)',
        gold: 'rgb(244, 178, 51)',
        form: {
          bg: 'rgba(224, 230, 233, 0.34)',
        },
        'ash-border': 'rgb(208, 213, 221)',
        landing: {
          feature: {
            bg: 'rgba(237, 242, 238, 1)',
          },
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'meteor-effect': 'meteor 5s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [
    require('tailwindcss-animate'),
    nextui(),
    require('@tailwindcss/aspect-ratio'),
  ],
};
