<script setup lang="ts">
import type { PropType, Ref, ComputedRef } from "vue"
import { ref, watch, computed, toRaw } from "vue"
import { ElCard, ElRow, ElCheckbox, ElCheckboxGroup, ElMenu, ElMenuItem } from "element-plus"
import { HeicImageContainer } from "@/components"
import { useLoading } from "@/composables"
import { useArrayUnique, useArrayDifference, useScroll } from "@vueuse/core"
import { FilesService } from "@/services"

const props = defineProps({
  modelValue: {
    type: Array as PropType<GlobalApp.FileType[]>,
    default: () => []
  },
  folder: {
    type: Object as PropType<GlobalApp.FolderType | undefined>,
    default: undefined
  }
})

const emit = defineEmits(["update:modelValue"])

const { load, unload, isLoading } = useLoading()

const filesRef = ref<HTMLElement>()
const filesList = ref<GlobalApp.FileType[]>([])
const pagination = ref<GlobalApp.Pagination>({
  page: 0,
  total: 0
})
const allCheckFiles = ref(false)
const checkFiles = ref<string[]>([])

const parseCheckFiles = computed(():GlobalApp.FileType[] => checkFiles.value.map((file) => JSON.parse(file)))

const { arrivedState } = useScroll(filesRef)

const arrayUnique = (array:GlobalApp.FileType[]) => {
  return useArrayUnique(array, (value, othVal) => value.path === othVal.path && value.name === othVal.name)
}

const arrayDifference = <T extends GlobalApp.FileType[]>(value: Ref<T> | ComputedRef<T>, othVal: Ref<T> | ComputedRef<T>) => {
  return useArrayDifference(value, othVal, (value, othVal) => value.path === othVal.path && value.name === othVal.name)
}

const hasAllCheckFiles = () => {
  const differenceFiles = arrayDifference(filesList, parseCheckFiles)
  allCheckFiles.value = differenceFiles.value.length === 0 && filesList.value.length !== 0
}

const handleCheckAllChange = () => {
  if (allCheckFiles.value) {
    const uniqueFiles = arrayUnique([...parseCheckFiles.value, ...toRaw(filesList.value)])
    checkFiles.value = uniqueFiles.value.map((file) => JSON.stringify(file))
  } else {
    const differenceFiles = arrayDifference(parseCheckFiles, filesList)
    checkFiles.value = differenceFiles.value.map((file) => JSON.stringify(file))
  }
  emit("update:modelValue", parseCheckFiles.value)
}

const handleCheckedCitiesChange = () => {
  hasAllCheckFiles()
  emit("update:modelValue", parseCheckFiles.value)
}

const getFilesList = async (folderPath: string, filePage: number, lazy?: boolean) => {
  load()

  if (!lazy) filesList.value = []

  const { data, page, total } = await FilesService.getFilesList(folderPath, filePage)

  if (lazy) {
    filesList.value = arrayUnique([...filesList.value, ...data]).value
  } else {
    filesList.value = data
  }

  pagination.value = {
    page,
    total
  }

  hasAllCheckFiles()
  unload()
}

watch(() => props.folder, async (folder) => {
  if (!folder) return

  await getFilesList(folder.path, 1)
})

watch(() => arrivedState.bottom, async (state) => {
  if (state && pagination.value.page < pagination.value.total) {
    if (!props.folder) return

    await getFilesList(props.folder.path, pagination.value.page + 1, true)
  }
})

watch(() => props.modelValue, (checkedFiles) => {
  checkFiles.value = checkedFiles.map((file) => JSON.stringify(file))
  hasAllCheckFiles()
}, { immediate: true, deep: true })
</script>

<template>
  <div class="folder-files">
    <ElRow class="card-label">
      <ElCheckbox
        v-model="allCheckFiles"
        :disabled="filesList.length === 0"
        @change="handleCheckAllChange"
      />
      <p>選取檔案:</p>
    </ElRow>
    <div v-loading="isLoading">
      <ElCard
        ref="filesRef"
        shadow="never"
      >
        <ElCheckboxGroup
          v-model="checkFiles"
          @change="handleCheckedCitiesChange"
        >
          <ElMenu>
            <ElMenuItem
              v-for="file in filesList"
              :key="file.name"
              :index="file.name"
            >
              <ElCheckbox
                class="full-screen"
                :value="JSON.stringify(file)"
              >
                <HeicImageContainer
                  :tip-title="`${file.path}/${file.name}`"
                  :file="file"
                />
              </ElCheckbox>
            </ElMenuItem>
          </ElMenu>
        </ElCheckboxGroup>
      </ElCard>
    </div>
  </div>
</template>
