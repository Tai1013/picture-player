<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ElMain, ElDialog, ElButton, ElRow, ElEmpty } from "element-plus"
import { storeToRefs, useConfigStore } from "@/stores"
import { HeicSvgIcon } from "@/components"
import { useLoading } from "@/composables"
import { AppService } from "@/services"

const { isLoading, load, unload } = useLoading()
const { mode, information } = storeToRefs(useConfigStore())

const dialogVisible = ref(false)

const actionEnable = async () => {
  load()
  await AppService.postAppActivate()
    .then((response) => {
      if (response) {
        mode.value = "playback"
        return
      }

      dialogVisible.value = true
    })
    .finally(() => unload())
}

onMounted(async () => {
  load()
  await AppService.getCommonInfo()
    .then((response) => {
      if (response.is_active) {
        mode.value = "playback"
        return
      }

      dialogVisible.value = true
      unload()
    })
})
</script>

<template>
  <ElMain v-loading="isLoading">
    <ElDialog
      v-model="dialogVisible"
      :title="`歡迎使用${ information.displayName }`"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      align-center
      :z-index="1000"
    >
      <ElEmpty
        class="padding-none"
        :image-size="300"
        :description="`${ information.displayName }可讓您在NAS上瀏覽${ information.supportFile }`"
      >
        <template #image>
          <HeicSvgIcon
            name="i_enable"
            size="300"
          />
        </template>
      </ElEmpty>
      <template #footer>
        <ElRow justify="center">
          <ElButton
            color="#332F49"
            @click="actionEnable()"
          >
            啟用
          </ElButton>
        </ElRow>
      </template>
    </ElDialog>
  </ElMain>
</template>

<style lang="scss" scoped>
main {
  background-image: url('@/assets/images/welcome_bg.png');
  background-size: cover;
  background-position: center center;
}

:deep(.el-dialog) {
  max-height: 548px;
}

:deep(.el-empty) {
  padding: 0;

  .el-empty__description p {
    color: #3c3c3c;
  }
}

.el-button {
  min-width: 100px;
}
</style>
