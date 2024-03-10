<script setup lang="ts">
import type { PropType } from "vue"
import type { Placement } from "element-plus"
import { computed } from "vue"
import { ElRow, ElTooltip, ElButton } from "element-plus"
import { HeicSvgIcon } from "@/components"

const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  },
  iconSize: {
    type: [Number, String],
    default: 16
  },
  buttonSize: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 40
  },
  color: {
    type: String,
    default: ""
  },
  tooltip: {
    type: String,
    default: ""
  },
  placement: {
    type: String as PropType<Placement>,
    default: "top"
  },
  isTranslate: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(["click"])

const buttonStyle = computed(() => {
  if (typeof props.buttonSize === "number") {
    return `min-width: ${props.buttonSize}px; height: ${props.buttonSize}px;`
  }
  if (Array.isArray(props.buttonSize)) {
    const isNumber = props.buttonSize.filter((size) => typeof size === "number")
    if (isNumber.length === 2) return `min-width: ${props.buttonSize[0]}px; height: ${props.buttonSize[1]}px;`
  }
  return "min-width: 40px; height: 40px;"
})
</script>

<template>
  <div class="square-button pointer-events-auto white">
    <template v-if="tooltip">
      <ElTooltip
        :content="tooltip"
        :placement="placement"
      >
        <ElButton
          :style="buttonStyle"
          :class="$attrs.class"
          :disabled="disabled"
          @click="$emit('click')"
        >
          <ElRow>
            <HeicSvgIcon
              v-if="icon"
              :name="icon"
              :size="iconSize"
              :color="color"
            />
            <slot name="button-label">
              <div
                v-if="label"
                class="button-label"
              >
                {{ label }}
              </div>
            </slot>
          </ElRow>
        </ElButton>
      </ElTooltip>
    </template>
    <template v-else>
      <ElButton
        :style="buttonStyle"
        :class="$attrs.class"
        :disabled="disabled"
        @click="$emit('click')"
      >
        <ElRow>
          <HeicSvgIcon
            v-if="icon"
            :name="icon"
            :size="iconSize"
            :color="color"
          />
          <slot name="button-label">
            <div
              v-if="label"
              class="button-label"
            >
              {{ label }}
            </div>
          </slot>
        </ElRow>
      </ElButton>
    </template>
  </div>
</template>
