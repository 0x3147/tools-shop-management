/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'login-background': "url('src/assets/login.svg')"
      })
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
