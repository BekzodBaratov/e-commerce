/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,css,sass,css}",
        "./src/**/**/*.{vue,js,ts,jsx,tsx,css,sass,css}",
    ],
    theme: {
        screens: {
            'xs': '320px',

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
            'custom': '1440px',
            // => @media (min-width: 1440px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1800px',
        },
        extend: {
            colors: {
                gray: {
                    DEFAULT: '#F5F5F7',
                    blue: '#DFE3E8'
                },
                dark: {
                    blue: '#28293D',
                    silver: '#979797',
                },
                light: {
                    purple: '#E0E7FF',
                    silver: '#C4CDD5'
                },
                banner: {
                    '01': '#4C6FFF1A',
                    '02': '#EDC7001A',
                    '03': '#ED72001A',
                },
                'smoke': '#F1F1F3',
                'primary': '#3366FF',
                'black': '#1D1D1F',
                'silver': '#B1B1B8',
                'gold': '#FFA445',
                'dodgerblue': '#5BABF2',
                'my-green': '#00CF83',
                'white': '#fff',
            },

            backgroundColor: {
                skin: {
                    ban1: withoutOpacity("--color-ban-1"),
                    ban2: withoutOpacity("--color-ban-2"),
                    ban3: withoutOpacity("--color-ban-3")
                },
            },
        },

    },
    plugins: [],
}

function withoutOpacity(variableName) {
    return ({opacityValue}) => {
        if (opacityValue !== undefined) {
            return `var(${variableName})`
        }
        return `var(${variableName}))`
    }
}