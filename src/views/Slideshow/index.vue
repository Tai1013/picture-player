<script setup lang="ts">
import { ElMain } from "element-plus"
import { HeicSquareButton, HEicHorizontalList } from "@/components"
import { useIdle } from "@vueuse/core"
import { storeToRefs, useConfigStore } from "@/stores"
import ControlBar from "./components/ControlBar.vue"
import FeatureBar from "./components/FeatureBar.vue"
import ImageView from "./ImageView.vue"

const { idle } = useIdle(3000)
const { mode } = storeToRefs(useConfigStore())

const handleClose = () => {
  mode.value = "playback"
}
</script>

<template>
  <ElMain>
    <FeatureBar v-show="!idle" />
    <ControlBar v-show="!idle" />
    <HeicSquareButton
      v-show="!idle"
      class="slideshow-close"
      icon="common-close"
      tooltip="關閉"
      @click="handleClose"
    />
    <HEicHorizontalList
      v-show="!idle"
      :name-visable="false"
      delayed
    />
    <ImageView />
  </ElMain>
</template>

<style lang="scss" scoped>
.slideshow-close {
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 100;
}

.playlist-horizontal {
  bottom: 0;
  max-height: 180px;
}
</style>
