/** @type {import("tailwindcss").Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                dark: '#111',
                light: '#eee'
            }
        }
    },
    presets: [require("@acme/tailwind-config")],
};
