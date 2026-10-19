/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f2a3d',
        teal: { DEFAULT: '#0e7c86', dark: '#0a5d65', soft: '#dff1f2' },
        mist: '#f4f7f6',
        sun: '#f28c28',
        lime: '#b7e04a',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
