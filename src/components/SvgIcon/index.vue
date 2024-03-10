<script setup lang="ts">
import { computed } from "vue"
import { ElIcon } from "element-plus"

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    default: "icon"
  },
  size: {
    type: [String, Number],
    default: "24"
  },
  color: {
    type: String,
    default: ""
  },
  maxWidth: {
    type: String,
    default: "100%"
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <ElIcon
    v-bind="$attrs"
    :style="`max-width: ${maxWidth}`"
    :color="color"
    :size="size"
  >
    <svg aria-hidden="true">
      <use :href="symbolId" />
    </svg>
  </ElIcon>
</template>

<style lang="scss" scoped>
.el-icon svg {
  width: inherit;
  height: inherit;
}
</style>
