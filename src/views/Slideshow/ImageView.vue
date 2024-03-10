<script setup lang="ts">
import { ElImage } from "element-plus"
import { HeicSvgIcon } from "@/components"
import { usePlayerStore, storeToRefs } from "@/stores"

const { currentFile, delayedCurrentFile, effect, isPending } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="full-screen image-view">
    <Transition :name="effect">
      <ElImage
        v-show="!isPending"
        class="full-screen"
        :src="delayedCurrentFile.previewImage"
        fit="contain"
        @load="currentFile.state = true"
        @error="currentFile.state = false"
      >
        <template #error>
          <div class="el-image__error">
            <HeicSvgIcon
              name="image_error"
              size="300"
            />
          </div>
        </template>
      </ElImage>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/animation/index";

.image-view {
  position: relative;
  overflow: hidden;
}
</style>
