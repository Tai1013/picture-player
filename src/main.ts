import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementIcon from './plugin/element-icon'
import ElementPlus from './plugin/element-plus'

const app = createApp(App)

app.use(ElementIcon)
app.use(ElementPlus)
app.mount('#app')
