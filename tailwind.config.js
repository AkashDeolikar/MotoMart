// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Make sure this is present
    ],
    theme: {
        extend: {
            animation: {
                'loading-bar': 'loadingBar 2s infinite ease-in-out',
            },
            keyframes: {
                loadingBar: {
                    '0%': { width: '0%' },
                    '50%': { width: '100%' },
                    '100%': { width: '0%' },
                },
            },
        },
    },
    plugins: [],
};
