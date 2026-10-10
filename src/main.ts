import './assets/base.css'

import { createApp } from 'vue'
import RootApp from './App.vue'
import { router } from './router/index.ts'

const app = createApp(RootApp)
app.use(router)
app.mount('#app')
