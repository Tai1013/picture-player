<script setup lang="ts">
import { ref } from "vue"
import { ElRow, ElDialog, ElImage } from "element-plus"
import { HeicIconButton, HeicSvgIcon, HeicDropdown } from "@/components"
import { useConfigStore, storeToRefs } from "@/stores"
import { filePath } from "@/helper"

const { information } = storeToRefs(useConfigStore())

const dialogVisible = ref(false)

const options: GlobalApp.DropdownOption[] = [
  {
    label: "about",
    value: "about",
    icon: "menu-about",
    onClick: () => {
      dialogVisible.value = true
    }
  }
]
</script>

<template>
  <HeicDropdown
    class="icon-button"
    :options="options"
  >
    <HeicIconButton
      tooltip="更多"
      icon="player-more"
      :button-size="32"
      :icon-size="30"
    />
  </HeicDropdown>

  <ElDialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :width="500"
    append-to-body
    align-center
  >
    <template #header="{ titleClass }">
      <ElRow :class="titleClass">
        <HeicSvgIcon name="menu-about" />
        <span>關於</span>
      </ElRow>
    </template>
    <div class="about-info-container">
      <ElImage
        class="app-logo"
        :src="filePath('@/assets/images/HEICViewer.png')"
        :alt="information.displayName"
      />
      <p class="app-name">
        {{ information.displayName }}
      </p>
      <div class="app-version">
        {{ information.version }}
      </div>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.about-info-container {
  text-align: center;

  .app-logo {
    width: 144px;
  }

  .app-name {
    font-size: 20px;
    font-weight: bold;
    color: #146059;
  }

  .app-version {
    color: #474747;
  }
}
</style>
