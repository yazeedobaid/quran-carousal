import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

import './assets/index.css'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
