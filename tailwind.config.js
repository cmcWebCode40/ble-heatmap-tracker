/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      white: {
        100: '#FFFFFF',
        200: '#EFEFEF',
        300: '#EFE9EF',
      },
      yellow: {
        100: '#FEF7D1',
        200: '#FBD51A',
      },
      black: {
        100: '#000',
      },
      red: {
        100: '#c53030',
        200: '#B01F24',
        300: '#dc2626',
      },
      orange: {
        100: '#F5811F',
        200: '#FFF0D8',
      },
      blue: {
        100: '#E2EEFF',
        200: '#205FBE',
      },
      green: {
        100: '#F1F8EC;',
        200: '#9AC963',
        300: '#1FB02E',
      },
      gray: {
        100: '#D9D9D9',
        200: '#F0F0F0',
        300: '#f8f8f8',
      },
      extend: {
        fontFamily: {
          normal: ['Inter-Regular'],
          medium: ['Inter-Medium'],
          bold: ['Inter-Bold'],
          'semi-bold': ['Inter-SemiBold'],
        },
      },
    },
    extend: {},
  },
  plugins: [],
};
