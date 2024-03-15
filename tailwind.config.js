/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'login-background': "url('/login.svg')"
      })
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
