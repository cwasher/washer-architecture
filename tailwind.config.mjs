/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Source Sans 3"', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        body: ['"Source Serif 4"', 'Cambria', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          orange: '#FF9D00',
          'orange-light': '#FFB840',
          'orange-dark': '#E08A00',
          'orange-text': '#B87300',
          teal: '#476066',
          'teal-light': '#5A7A82',
          'teal-dark': '#344950',
          slate: '#7D87A1',
          'slate-light': '#9AA2B8',
          'slate-dark': '#636B82',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
