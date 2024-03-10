<script setup lang="ts">
import type { PropType } from "vue"
import type { DirectionType } from "@/configs/constant"
import { ElImage } from "element-plus"
import { HeicSvgIcon } from "@/components"
import { filePath } from "@/helper"

defineProps({
  file: {
    type: Object as PropType<GlobalApp.FileType>,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: (): DirectionType => "vertical"
  },
  nameVisable: {
    type: Boolean,
    default: true
  },
  tipTitle: {
    type: String,
    default: ""
  }
})

</script>

<template>
  <div
    :class="direction"
    class="image-container"
  >
    <ElImage
      :src="filePath(file.thumbnailImage)"
      fit="contain"
      loading="lazy"
      :class="{ 'name-hidden': nameVisable === false }"
    >
      <template #error>
        <div class="el-image__error">
          <HeicSvgIcon
            name="image_error"
          />
        </div>
      </template>
    </ElImage>
    <div
      v-if="nameVisable"
      :title="tipTitle || file.name"
      :class="{'active': active}"
      class="image-name"
    >
      {{ file.name }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  width: 100%;

  &.vertical {
    display: flex;
    align-items: center;
  }

  .el-image__error .el-icon {
    width: 70%;
    height: auto;
  }
}

.vertical {
  .el-image {
    width: 54px;
    min-width: 54px;
    height: 36px;
  }

  .image-name {
    padding-left: 6px;
  }
}

.horizontal {
  .el-image {
    width: 100%;
    height: calc(100% - 23px);

    &.name-hidden {
      height: 100%;
    }
  }

  .image-name {
    margin-top: 3px;
    height: 20px;
    text-align: center;
  }

  .el-image__error {
    background-color: transparent;
  }
}

.el-image {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: var(--el-color-black);
}

.image-name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: initial;

  &.active {
    color: var(--el-color-primary);
  }
}
</style>
