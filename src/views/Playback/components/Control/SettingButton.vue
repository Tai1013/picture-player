<script setup lang="ts">
import type { DirectionType, ImageBlurType } from "@/configs/constant"
import { computed } from "vue"
import { HeicIconButton, HeicDropdown } from "@/components"
import { usePlayerStore, storeToRefs } from "@/stores"
import { DIRECTION_LIST , IMAGE_BLUR_LIST } from "@/configs/constant"

const { direction, imageBlur } = storeToRefs(usePlayerStore())

const options = computed((): GlobalApp.DropdownOption[] => [
  {
    label: "背景霧化",
    value: "background",
    children: IMAGE_BLUR_LIST.map((list) => ({
      ...list,
      active: list.value === imageBlur.value,
      onClick: (command: ImageBlurType) => {
        imageBlur.value = command
      }
    } as GlobalApp.DropdownOption))
  },
  {
    label: "播放清單",
    value: "playlist",
    children: DIRECTION_LIST.map((list) => ({
      ...list,
      active: list.value === direction.value,
      onClick: (command: DirectionType) => {
        direction.value = command
      }
    } as GlobalApp.DropdownOption))
  }
])
</script>

<template>
  <HeicDropdown
    class="icon-button"
    :options="options"
  >
    <HeicIconButton
      tooltip="設定"
      icon="player-setting"
    />
  </HeicDropdown>
</template>
