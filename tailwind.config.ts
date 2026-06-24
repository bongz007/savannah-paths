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
        savannah: {
          amber:        '#D4891F',
          'amber-dark': '#B86C14',
          green:        '#2D5016',
          'green-light':'#4A7C2A',
          cream:        '#F7F2E8',
          earth:        '#8B5E3C',
          sand:         '#C9A96E',
          dusk:         '#5C3D2E',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
