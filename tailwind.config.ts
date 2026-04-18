import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aura-white': '#FFFFFF',
        'aura-black': '#1d1d1f',
        'aura-gray': '#6e6e73',
        'aura-light-gray': '#f5f5f7',
        'aura-blue': '#0071e3',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        pill: '9999px',
        apple: '20px',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
}
export default config
