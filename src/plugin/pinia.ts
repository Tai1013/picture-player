import { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

const install: Plugin = app => {
  const pinia = createPinia()
  pinia.use(createPersistedStatePlugin({
    persist: false
  }))
  app.use(pinia)
}

export default install
