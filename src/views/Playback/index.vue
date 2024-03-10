<script setup lang="ts">
import { computed } from "vue"
import { ElMain, ElImage } from "element-plus"
import { HeicSvgIcon } from "@/components"
import { usePlayerStore, storeToRefs } from "@/stores"
import { useIdle } from "@vueuse/core"
import ImageView from "./ImageView.vue"
import PanoramicView from "./PanoramicView.vue"
import ActionContainer from "./components/Action/index.vue"
import ControlContainer from "./components/Control/index.vue"
import FileSelectorDialog from "./components/FileSelector/index.vue"
import PlayList from "./components/PlayList/index.vue"

const { currentFile, emptyFile, direction, isPlayList, isPanoramic, fileSelectorDialog } = storeToRefs(usePlayerStore())
const { idle } = useIdle(5000)

const viewMode = {
  image: ImageView,
  panoramic: PanoramicView
}

const view = computed(() => {
  if (isPanoramic.value && currentFile.value.state) {
    return "panoramic"
  }
  return "image"
})

const isPlaylistIdle = computed(() => {
  if (direction.value === "horizontal") {
    return !idle.value && isPlayList.value
  }
  return isPlayList.value
})
</script>

<template>
  <ElMain class="flex-center">
    <ActionContainer v-show="!idle" />
    <template v-if="emptyFile">
      <HeicSvgIcon
        class="cursor-pointer"
        name="ic_addfile"
        size="90"
        @click="fileSelectorDialog = true"
      />
    </template>
    <template v-else>
      <component :is="viewMode[view]" />
      <ElImage
        v-show="false"
        :src="currentFile.previewImage"
        @load="currentFile.state = true"
        @error="currentFile.state = false"
      />
    </template>
    <ControlContainer v-show="!idle" />
    <FileSelectorDialog v-if="fileSelectorDialog" />
  </ElMain>
  <PlayList v-show="isPlaylistIdle" />
</template>

<style lang="scss" scoped>
.el-main {
  position: relative;
}

.action-container {
  position: absolute;
  top: 0;
  z-index: 100;
}

.control-container {
  position: absolute;
  bottom: 0;
  z-index: 100;
}
</style>
