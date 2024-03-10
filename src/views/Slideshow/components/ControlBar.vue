<script setup lang="ts">
import { computed } from "vue"
import { ElRow } from "element-plus"
import { HeicSquareButton } from "@/components"
import { useConfigStore, usePlayerStore, storeToRefs } from "@/stores"

const { isFullscreen } = storeToRefs(useConfigStore())
const { toggleFullscreen } = useConfigStore()
const { isPlaying, delayedCurrentFile, files } = storeToRefs(usePlayerStore())
const { pause, resume, playPrev, playNext } = usePlayerStore()

const controlButtons = computed((): GlobalApp.SquareButtonType[] => [
  {
    tooltip: isPlaying.value ? "暫停" : "播放",
    icon: isPlaying.value ? "slideshow-pause" : "slideshow-play",
    color: isPlaying.value ? "" : "#548DDF",
    onClick: () => {
      if (isPlaying.value) return pause()
      resume()
    }
  },
  {
    tooltip: "上一張圖",
    icon: "slideshow-prev",
    onClick: () => {
      playPrev()
    }
  },
  {
    label: `${delayedCurrentFile.value.index} / ${files.value.length}`,
    isTranslate: false,
    class: "cursor-default"
  },
  {
    tooltip: "下一張圖",
    icon: "slideshow-next",
    onClick: () => {
      playNext()
    }
  },
  {
    tooltip: delayedCurrentFile.value.name,
    icon: "slideshow-filename",
    isTranslate: false,
    class: "cursor-default"
  },
  // {
  //   tooltip: "download",
  //   icon: "slideshow-download",
  //   onClick: () => {
  //     const { path, name } = delayedCurrentFile.value
  //     FilesService.postFileDownload(path, name)
  //   }
  // },
  {
    tooltip: isFullscreen.value ? "離開全螢幕" : "全螢幕播放",
    iconSize: 24,
    icon: isFullscreen.value ? "player-fullscreen-exit" : "player-fullscreen",
    onClick: () => {
      toggleFullscreen()
    }
  }
])
</script>

<template>
  <ElRow class="control-bar">
    <HeicSquareButton
      v-for="(control, index) in controlButtons"
      :key="index"
      :class="control.class"
      :tooltip="control.tooltip"
      :icon="control.icon"
      :label="control.label"
      :color="control.color"
      :icon-size="control.iconSize"
      :button-size="50"
      :is-translate="control.isTranslate"
      @click="control.onClick ? control.onClick() : () => {}"
    />
  </ElRow>
</template>

<style lang="scss" scoped>
.control-bar {
  position: absolute;
  left: 50%;
  bottom: 140px;
  z-index: 100;
  transform: translateX(-50%);
  border-radius: var(--el-border-radius-base);
  background-color: #ffffff;

  @media only screen and (min-height: 600px) {
    bottom: calc(20% + 20px);
  }

  @media only screen and (min-height: 900px) {
    bottom: 200px;
  }
}
</style>
