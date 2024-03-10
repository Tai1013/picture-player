<script setup lang="ts">
import { computed } from "vue"
import { ElRow } from "element-plus"
import { HeicIconButton } from "@/components"
import { usePlayerStore, useConfigStore, storeToRefs } from "@/stores"
import { FilesService } from "@/services"
import MoreButton from "./MoreButton.vue"

const { mode } = storeToRefs(useConfigStore())
const { currentFile, emptyFile, isPanoramic, fileSelectorDialog } = storeToRefs(usePlayerStore())

const actionButtons = computed((): GlobalApp.IconButtonType[] => [
  {
    tooltip: "360度",
    icon: "player-pano",
    active: isPanoramic.value,
    visable: !emptyFile.value,
    onClick: () => {
      isPanoramic.value = !isPanoramic.value
    }
  },
  {
    tooltip: "網路投影",
    icon: "player-mirror",
    visable: !emptyFile.value && false,
    onClick: () => {}
  },
  //   {
  //   tooltip: "下載",
  //   icon: "player-download",
  //   visable: !emptyFile.value,
  //   onClick: () => {
  //     const { path, name } = currentFile.value
  //     FilesService.postFileDownload(path, name)
  //   }
  // },
  {
    tooltip: "投影片模式",
    icon: "player-slideshow",
    visable: !emptyFile.value,
    onClick: () => {
      mode.value = "slideshow"
    }
  }
])
</script>

<template>
  <div class="action-container pointer-events-none">
    <ElRow justify="space-between">
      <ElRow class="min-width-none">
        <HeicIconButton
          tooltip="選取檔案"
          icon="ic_header_file"
          :button-size="32"
          :icon-size="30"
          @click="fileSelectorDialog = true"
        />
        <div
          v-if="!emptyFile"
          :title="currentFile.name"
          class="truncate pointer-events-auto"
        >
          {{ currentFile.name }}
        </div>
      </ElRow>
      <ElRow justify="end">
        <template
          v-for="action in actionButtons"
          :key="action.icon"
        >
          <HeicIconButton
            v-if="action.visable !== false"
            :tooltip="action.tooltip"
            :icon="action.icon"
            :button-size="32"
            :icon-size="30"
            :active="action.active"
            @click="action.onClick ? action.onClick() : () => {}"
          />
        </template>
        <MoreButton />
      </ElRow>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.action-container {
  padding: 18px 12px;
  width: 100%;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, rgba(#000000, 0.5) 0%, transparent 100%);
}
</style>
