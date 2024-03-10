<script setup lang="ts">
import type Node from "element-plus/es/components/tree/src/model/node"
import { ref } from "vue"
import { ElRow, ElCard, ElTree } from "element-plus"
import { FilesService } from "@/services"
import { HeicSvgIcon } from "@/components"
import { useLoading } from "@/composables"

const emit = defineEmits(["click"])

const { load, unload, isLoading } = useLoading()

const treeRef = ref<InstanceType<typeof ElTree>>()
const actionFolderId = ref("")

const loadNode = async (node: Node, resolve: (data: GlobalApp.FolderType[]) => void) => {
  if (node.level === 0) {
    load()
    return resolve(
      await FilesService.getFoldersList()
        .finally(() => unload())
    )
  }
  return resolve(
    await FilesService.getFoldersList((node.data as GlobalApp.FolderType).path)
  )
}

const handleClickNode = async (data: GlobalApp.FolderType) => {
  actionFolderId.value = data.path
  emit("click", data)
}

const handleExpandNode = async (data: GlobalApp.FolderType) => {
  if (!treeRef.value) return
  const node = treeRef.value.getNode(data.path)
  node.loaded = false
  node.expanded = false
  node.expand()
}
</script>

<template>
  <div class="folder-tree">
    <ElRow class="card-label">
      <p> 選取資料夾: </p>
    </ElRow>
    <ElCard
      v-loading="isLoading"
      shadow="never"
    >
      <ElTree
        ref="treeRef"
        node-key="path"
        :load="loadNode"
        lazy
        :expand-on-click-node="false"
        @node-click="handleClickNode"
        @node-expand="handleExpandNode"
      >
        <template #default="{ node, data }: { node: Node, data: GlobalApp.FolderType }">
          <HeicSvgIcon :name="node.expanded ? 'folder-expand' : 'folder-collapse'" />
          <span
            :class="{ 'active': node.key === actionFolderId }"
            class="files-text"
          >
            {{ data.name }}
          </span>
        </template>
      </ElTree>
    </ElCard>
  </div>
</template>
