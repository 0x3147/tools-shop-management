import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/preflight.css'
import './styles/tailwind.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
