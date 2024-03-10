import "normalize.css"
import { createApp } from "vue"
import App from "./App.vue"
import Pinia from "./plugin/pinia"
import ElementPlus from "./plugin/element-plus"

import "virtual:svg-icons-register"
import "@egjs/vue3-view360/css/view360.min.css"
import "swiper/css";
import "swiper/css/navigation";
import "./assets/scss/main.scss"

const app = createApp(App)
app.use(Pinia)
app.use(ElementPlus)
app.mount("#app")
