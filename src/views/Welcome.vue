<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElEmpty, ElButton } from 'element-plus'
import { storeToRefs, useConfigStore } from '@/stores'

const title = import.meta.env.VITE_APP_TITLE
const { mode } = storeToRefs(useConfigStore())
const isExpand = ref(true)

const closeHandler = () => {
  mode.value = "player"
}
</script>

<template lang="pug">
.welcome
  ElDialog(
    v-model="isExpand"
    :title="`Welcome to ${title}`"
    width="95%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
    @closed="closeHandler"
  )
    ElEmpty(:description="`Allows you to browse images on ${title}`")
    .dialog-footer(class="flex justify-center")
      ElButton(
        type="primary"
        @click="isExpand = false"
      ) Enable
</template>

<style scoped lang="scss">
:deep(.el-dialog) {
  @apply max-w-3xl
}
</style>
