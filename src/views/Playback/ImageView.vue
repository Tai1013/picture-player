<script setup lang="ts">
import { ElImage } from "element-plus"
import { HeicSvgIcon } from "@/components"
import { usePlayerStore, storeToRefs } from "@/stores"

const { currentFile, imageBlur } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="full-screen image-view">
    <div
      v-show="imageBlur === 'on'"
      class="full-screen image-blur"
    >
      <ElImage
        class="full-screen"
        :src="currentFile.thumbnailImage"
        fit="cover"
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
    </div>
    <ElImage
      class="full-screen"
      :src="currentFile.previewImage"
      fit="contain"
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
  </div>
</template>

<style lang="scss" scoped>
.image-view {
  position: relative;
  overflow: hidden;
}

.image-blur {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  background-color: #ffffff;

  .el-image {
    opacity: 0.5;
    filter: blur(10px);
  }
}
</style>
