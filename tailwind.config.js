/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shark: {
                    deep: '#0a0f18',
                    dark: '#121a29',
                    light: '#1e293b',
                    accent: '#00d2ff',
                    fluid: '#3498db',
                    silver: '#bdc3c7',
                },
                premium: {
                    gold: '#d4af37',
                    neon: '#00f2fe',
                }
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fluid-bg': 'fluid 10s ease infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                fluid: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
