import type { Language } from "element-plus/es/locale"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useFullscreen } from "@vueuse/core"

export const useConfigStore = defineStore("configStore",
  () => {
    const locale = ref<string>("en")
    const elementLocale = ref<Language>()
    const mode = ref<GlobalApp.Mode>("welcome")
    const information = ref({
      isActive: false,
      displayName: "",
      version: "",
      supportFile: "",
      isShowCast: false
    })

    const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

    return {
      locale,
      elementLocale,
      mode,
      information,
      isFullscreen,

      toggleFullscreen
    }
  }
)
