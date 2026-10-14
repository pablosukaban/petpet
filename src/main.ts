import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import RootApp from './App.vue'
import { router } from './router/index.ts'

const pinia = createPinia()
const app = createApp(RootApp)

app.use(pinia)
app.use(router)
app.mount('#app')
