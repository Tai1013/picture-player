<script setup lang="ts">
import { ref } from "vue"
import { ElDialog, ElRow, ElCol, ElButton } from "element-plus"
import { usePlayerStore, storeToRefs } from "@/stores"
import { useCloned } from "@vueuse/core"
import FolderTree from "./FolderTree.vue"
import FolderFiles from "./FolderFiles.vue"
import FileSelectedList from "./FileSelectedList.vue"

const { files, fileSelectorDialog } = storeToRefs(usePlayerStore())
const { updateFile, resume } = usePlayerStore()

const actionFolder = ref<GlobalApp.FolderType>()
const checkedFiles = ref<GlobalApp.FileType[]>(files.value)

const handleClickFolder = (data: GlobalApp.FolderType) => {
  const { cloned } = useCloned(data)
  actionFolder.value = cloned.value
}

const handleApply = () => {
  if (checkedFiles.value.length > 0) {
    updateFile(checkedFiles.value[0])
    resume()
  }

  files.value = checkedFiles.value
  fileSelectorDialog.value = false
}

const handleCancel = () => {
  fileSelectorDialog.value = false
}
</script>

<template>
  <div class="file-selector">
    <ElDialog
      v-model="fileSelectorDialog"
      class="file-dialog"
      title="選取檔案"
      :close-on-click-modal="false"
      align-center
      destroy-on-close
    >
      <ElRow
        class="flex-wrap"
        align="top"
        :gutter="18"
      >
        <ElCol
          :span="8"
          :xs="12"
        >
          <FolderTree @click="handleClickFolder" />
        </ElCol>
        <ElCol
          :span="8"
          :xs="12"
        >
          <FolderFiles
            v-model="checkedFiles"
            :folder="actionFolder"
          />
        </ElCol>
        <ElCol
          :span="8"
          :xs="24"
        >
          <FileSelectedList v-model="checkedFiles" />
        </ElCol>
      </ElRow>
      <template #footer>
        <ElButton
          color="#332F49"
          @click="handleApply"
        >
          套用
        </ElButton>
        <ElButton
          plain
          @click="handleCancel"
        >
          取消
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/fileDialog";
</style>
