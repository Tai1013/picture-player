import 'normalize.css'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import Pinia from './plugin/pinia'
import ElementIcon from './plugin/element-icon'
import ElementPlus from './plugin/element-plus'

const app = createApp(App)
app.use(Pinia)
app.use(ElementIcon)
app.use(ElementPlus)
app.mount('#app')
