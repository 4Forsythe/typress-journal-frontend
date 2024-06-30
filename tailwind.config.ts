import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        logotype: ['var(--font-raleway)'],
      },
      fontSize: {
        sm: '15px',
        base: '17px',
        xl: '21px',
        xs: '13px',
      },
      colors: {
        dark: '#171717',
        contrast: '#20232A',
        surface: '#FAFAFA',
        accent: '#F4FF78',
        'lite-gray': '#E6E6E6',
        'lite-outline': '#D0D0D2',
        outline: '#888A8D',
        'dark-outline': '#626570',
      },
    },
  },
  plugins: [],
}

export default config
