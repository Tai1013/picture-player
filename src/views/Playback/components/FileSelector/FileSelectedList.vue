<script setup lang="ts">
import type { PropType } from "vue"
import { ref, computed, watch } from "vue"
import { ElCard, ElRow, ElMenu, ElMenuItem, ElDivider, ElButton, ElText } from "element-plus"
import { HeicIconButton, HeicImageContainer } from "@/components"
import { useArrayDifference } from "@vueuse/core"
import { useSortable } from "@vueuse/integrations/useSortable"

const props = defineProps({
  modelValue: {
    type: Array as PropType<GlobalApp.FileType[]>,
    default: () => []
  }
})

const emit = defineEmits(["update:modelValue"])

const filesRef = ref<HTMLElement | null>(null)
const innerCheckedFiles = ref(props.modelValue)

useSortable(filesRef, innerCheckedFiles)

const filesLength = computed(() => innerCheckedFiles.value.length)

const arrayDifference = <T extends GlobalApp.FileType[]>(value: T, othVal: T) => {
  return useArrayDifference(value, othVal, (value, othVal) => value.path === othVal.path && value.name === othVal.name)
}

const handleRemove = (file: GlobalApp.FileType) => {
  const differenceFiles = arrayDifference(innerCheckedFiles.value, [file])
  emit("update:modelValue", differenceFiles.value)
}

const handleRemoveAll = () => {
  emit("update:modelValue", [])
}

watch(() => props.modelValue, (checkedFiles) => {
  innerCheckedFiles.value = checkedFiles
}, { immediate: true, deep: true })
</script>

<template>
  <div class="file-selected-list">
    <ElRow
      class="card-label"
      justify="space-between"
    >
      <p>已選取的檔案:</p>
      <ElRow justify="end">
        <ElText type="primary">
          {{ filesLength }} 已選取
        </ElText>
        <ElDivider direction="vertical" />
        <ElButton
          link
          @click="handleRemoveAll"
        >
          取消
        </ElButton>
      </ElRow>
    </ElRow>
    <ElCard shadow="never">
      <ElMenu ref="filesRef">
        <ElMenuItem
          v-for="file in innerCheckedFiles"
          :key="file.name"
          :index="file.name"
        >
          <HeicImageContainer
            :tip-title="file.path"
            :file="file"
          >
            <template #default>
              <HeicIconButton
                class="remove-button"
                tooltip="移除"
                icon="player-delete"
                @click="handleRemove(file)"
              />
            </template>
          </HeicImageContainer>
        </ElMenuItem>
      </ElMenu>
    </ElCard>
  </div>
</template>
