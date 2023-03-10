/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        light: '#F1EDE7',
        dark: '#2B2B2B',
      },
      fontFamily: {
        sans: 'Euclid Circular, sans-serif',
        display: 'ivypresto-display',
      },
    },
  },
  presets: [require('@acme/tailwind-config')],
  plugins: [require('@tailwindcss/typography')],
};
