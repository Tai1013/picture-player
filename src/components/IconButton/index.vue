<script setup lang="ts">
import type { PropType } from "vue"
import type { Placement } from "element-plus"
import { ElTooltip, ElButton } from "element-plus"
import { HeicSvgIcon } from "@/components"

defineProps({
  icon: {
    type: String,
    required: true
  },
  iconSize: {
    type: [Number, String],
    default: 24
  },
  buttonSize: {
    type: [Number, String],
    default: 24
  },
  tooltip: {
    type: String,
    default: ""
  },
  placement: {
    type: String as PropType<Placement>,
    default: "bottom"
  },
  color: {
    type: String,
    default: ""
  },
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(["click"])
</script>

<template>
  <div class="icon-button circle-button pointer-events-auto">
    <template v-if="tooltip">
      <ElTooltip
        :content="tooltip"
        :placement="placement"
      >
        <ElButton
          :style="`width: ${buttonSize}px; height: ${buttonSize}px;`"
          :class="{ 'active': active }"
          :disabled="disabled"
          text
          circle
          @click="$emit('click')"
        >
          <HeicSvgIcon
            :name="icon"
            :size="iconSize"
            :color="color"
          />
        </ElButton>
      </ElTooltip>
    </template>
    <template v-else>
      <ElButton
        :style="`width: ${buttonSize}px; height: ${buttonSize}px;`"
        :class="{ 'active': active }"
        :disabled="disabled"
        text
        circle
        @click="$emit('click')"
      >
        <HeicSvgIcon
          :name="icon"
          :size="iconSize"
          :color="color"
        />
      </ElButton>
    </template>
  </div>
</template>
