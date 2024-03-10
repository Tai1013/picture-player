import type { DirectionType, ImageBlurType, EffectType } from "@/configs/constant"
import { defineStore, storeToRefs } from "pinia"
import { ref, computed, watch } from "vue"
import { useIntervalFn, useCloned, useTimeoutFn } from "@vueuse/core"
import { useConfigStore } from "./useConfigStore"
import { EFFECT_LIST } from "@/configs/constant"

interface FileType extends GlobalApp.FileType {
  state: boolean
  index: number | null
}

export const usePlayerStore = defineStore("playerStore",
  () => {
    const { mode } = storeToRefs(useConfigStore())

    const files = ref<GlobalApp.FileType[]>([])
    const currentFile = ref<FileType>({
      name: "",
      path: "",
      previewImage: "",
      thumbnailImage: "",
      state: false,
      index: null
    })
    const direction = ref<DirectionType>("vertical")
    const imageBlur = ref<ImageBlurType>("on")
    const effect = ref<EffectType>("none")
    const speed = ref(10)
    const isPanoramic = ref(false)
    const isPlayList = ref(true)
    const fileSelectorDialog = ref(false)
    const isLoading = ref(false)

    const { cloned } = useCloned(currentFile)
    const delayedCurrentFile = ref(cloned.value)

    const emptyFile = computed(() => {
      return !currentFile.value.path || !currentFile.value.name || files.value.length === 0
    })

    const fileIndex = computed(() => {
      return files.value.findIndex((file) => {
        return file.name === currentFile.value.name && file.path === currentFile.value.path
      })
    })

    const animationInterval = computed(() => {
      const findEffect = EFFECT_LIST.find((list) => list.value === effect.value)
      return findEffect ? findEffect.duration : 0
    })

    const speedIntervalMilliSecond = computed(() => {
      if (mode.value === "slideshow") {
        return (speed.value + animationInterval.value * 2) * 1000
      }
      return 5000
    })

    const innerInterval = computed(() => animationInterval.value * 1000)

    const { isPending, start } = useTimeoutFn(() => {
      delayedCurrentFile.value = cloned.value
    }, innerInterval)

    const { pause, resume, isActive: isPlaying } = useIntervalFn(() => {
      playNext()
    }, speedIntervalMilliSecond)

    watch(() => currentFile.value.index, () => {
      start()
    })

    const updateFile = (file: GlobalApp.FileType) => {
      currentFile.value.name = file.name
      currentFile.value.path = file.path
      currentFile.value.previewImage = file.previewImage
      currentFile.value.thumbnailImage = file.previewImage
    }

    const playPrev = () => {
      if (files.value.length === 0) return

      if (fileIndex.value === 0) {
        return updateFile(files.value[files.value.length - 1])
      }
      updateFile(files.value[fileIndex.value - 1])
    }

    const playNext = () => {
      if (files.value.length === 0) return

      if (fileIndex.value === files.value.length - 1) {
        return updateFile(files.value[0])
      }
      updateFile(files.value[fileIndex.value + 1])
    }

    watch(() => emptyFile.value, (empty) => {
      if (empty) pause()
    }, { immediate: true })

    watch(() => fileIndex.value, (index) => {
      currentFile.value.index = index > -1 ? index + 1 : null
    })

    watch(() => mode.value, () => {
      if (emptyFile.value) return
      resume()
    }, { immediate: true })

    return {
      files,
      currentFile,
      delayedCurrentFile,
      isPending,
      isPlaying,
      isPlayList,
      isPanoramic,
      isLoading,
      emptyFile,
      fileSelectorDialog,
      direction,
      imageBlur,
      effect,
      speed,
      animationInterval,

      updateFile,
      pause,
      resume,
      playPrev,
      playNext
    }
  }
)
