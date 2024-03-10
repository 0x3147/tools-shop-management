import router from '@/router'
import pinia from '@/store'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/preflight.css'
import './styles/tailwind.css'

const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
