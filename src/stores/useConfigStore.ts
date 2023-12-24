import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('configStore',
  () => {
    const mode = ref<GlobalApp.Mode>("welcome")
    return {
      mode
    }
  },
  {
    persistedState: {
      persist: true,
      includePaths: []
    }
  }
)
