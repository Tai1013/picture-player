<script setup lang="ts">
import type { EffectType } from "@/configs/constant"
import { computed } from "vue"
import { ElRow } from "element-plus"
import { EFFECT_LIST, SPEED_LIST } from "@/configs/constant"
import { HeicSquareButton, HeicDropdown } from "@/components"
import { storeToRefs, usePlayerStore } from "@/stores"

const { speed, effect } = storeToRefs(usePlayerStore())

const effectOptions = computed((): GlobalApp.DropdownOption[] => EFFECT_LIST.map((list) => ({
  ...list,
  active: list.value === effect.value,
  onClick: (command: EffectType) => {
    effect.value = command
  }
} as GlobalApp.DropdownOption)))

const speedOptions = computed((): GlobalApp.DropdownOption[] => SPEED_LIST.map((list) => ({
  ...list,
  active: list.value === speed.value,
  onClick: (command: number) => {
    speed.value = command
  }
} as GlobalApp.DropdownOption)))

const effectLabel = computed(() => {
  const effectName = EFFECT_LIST.find((list) => list.value === effect.value)?.label
  if (effectName && effect.value !== "none") return `options.${effectName}`
  return "播放特效"
})
</script>

<template>
  <ElRow class="feature-bar">
    <HeicDropdown
      :options="effectOptions"
      trigger="hover"
      :min-width="115"
    >
      <HeicSquareButton
        :label="effectLabel"
        :button-size="[115, 40]"
      />
    </HeicDropdown>
    <HeicDropdown
      :options="speedOptions"
      trigger="hover"
      :is-translate="false"
      :min-width="115"
    >
      <HeicSquareButton>
        <template #button-label>
          <div class="button-label">
            播放間隔: {{ speed }}
          </div>
        </template>
      </HeicSquareButton>
    </HeicDropdown>
  </ElRow>
</template>

<style lang="scss" scoped>
.feature-bar {
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 100;
  border-radius: var(--el-border-radius-base);
  background-color: #ffffff;

  :deep(.el-button) {
    padding: 8px 15px;
  }
}
</style>
