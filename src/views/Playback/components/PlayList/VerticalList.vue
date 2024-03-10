<script setup lang="ts">
import { ref } from "vue"
import { ElAside, ElRow } from "element-plus"
import { HeicSvgIcon, HeicImageContainer } from "@/components"
import { storeToRefs, usePlayerStore } from "@/stores"
import { useSortable } from "@vueuse/integrations/useSortable"

const { currentFile, files } = storeToRefs(usePlayerStore())
const { updateFile } = usePlayerStore()

const filesRef = ref<HTMLElement | null>(null)

useSortable(filesRef, files)

const handleClickFile = (file: GlobalApp.FileType) => {
  updateFile(file)
}
</script>

<template>
  <ElAside
    width="320px"
    class="playlist-vertical"
  >
    <div class="playlist-title playlist-item">
      <div class="w-full">
        <ElRow>
          <HeicSvgIcon
            name="player-playlist"
            class="playlist-icon"
          />
          <span>播放清單</span>
        </ElRow>
        <ElRow>
          <div class="playlist-icon" />
          <span class="playlist-amount">{{ files.length }} 檔案</span>
        </ElRow>
      </div>
    </div>
    <ul ref="filesRef">
      <li
        v-for="file in files"
        :key="`${file.path}/${file.name}`"
        class="playlist-item cursor-pointer"
        @click="handleClickFile(file)"
      >
        <HeicImageContainer
          :active="file.name === currentFile.name && file.path === currentFile.path"
          :file="file"
        />
      </li>
    </ul>
  </ElAside>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/playList";
</style>
