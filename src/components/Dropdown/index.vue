<script setup lang="ts">
import type { PropType } from "vue"
import type { TooltipTriggerType, Placement } from "element-plus"
import { ref, computed } from "vue"
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElRow } from "element-plus"
import { HeicSvgIcon } from "@/components"
import { useWindowSize, useElementBounding } from "@vueuse/core"

const props = defineProps({
  options: {
    type: Array as PropType<GlobalApp.DropdownOption[]>,
    required: true
  },
  trigger: {
    type: String as PropType<TooltipTriggerType>,
    default: "click"
  },
  placement: {
    type: String as PropType<Placement>,
    default: "top"
  },
  isTranslate: {
    type: Boolean,
    default: true
  },
  minWidth: {
    type: [String, Number],
    default: 150
  }
})

const emit = defineEmits(["command"])

const dropdownRef = ref<InstanceType<typeof ElDropdownMenu>>()

const { width } = useWindowSize()
const { width: dropWidth, right: dropRight } = useElementBounding(dropdownRef)

const childrenPlacement = computed((): Placement => {
  if (dropWidth.value > width.value - dropRight.value) {
    return "left"
  }
  return "right"
})

const dropdownMenuStyle = computed(() => {
  if (typeof props.minWidth === "number") {
    return `min-width: ${props.minWidth}px;`
  }
  return `min-width: ${props.minWidth};`
})

const isChildren = <T = GlobalApp.DropdownOption>(options: T | readonly T[]) => {
  const innerOptions = Array.isArray(options) ? options : [options]
  const findOption = innerOptions.find((option) => option.children && option.children.length > 0)
  return findOption ? true : false
}

const isActiveIcon = <T = GlobalApp.DropdownOption>(options: T | readonly T[]) => {
  const innerOptions = Array.isArray(options) ? options : [options]
  const findOption = innerOptions.find((option) => option.active)
  return findOption ? true : false
}

const handleCommandItem = (value: string | number) => {
  emit("command", value)
}
</script>

<template>
  <ElDropdown
    :trigger="trigger"
    :hide-on-click="!isChildren(options)"
    :placement="placement"
    @command="handleCommandItem"
  >
    <slot name="default" />
    <template #dropdown>
      <ElDropdownMenu
        ref="dropdownRef"
        :style="dropdownMenuStyle"
      >
        <ElDropdownItem
          v-for="option in options"
          :key="option.value"
          :command="option.value"
          @click="option.onClick ? option.onClick(option.value) : () => {}"
        >
          <template v-if="isChildren(option) && option.children && option.children.length > 0">
            <ElDropdown
              class="w-full"
              :trigger="trigger"
              :placement="childrenPlacement"
              @command="handleCommandItem"
            >
              <ElRow
                class="dropdown-item"
                justify="space-between"
              >
                <ElRow>
                  <HeicSvgIcon
                    v-if="option.active"
                    class="dropdown-icon-active"
                    name="menu-selected"
                    size="20"
                  />
                  <HeicSvgIcon
                    v-if="option.icon"
                    class="dropdown-icon"
                    :name="option.icon"
                    size="20"
                  />
                  <span>{{ option.label }}</span>
                </ElRow>
                <HeicSvgIcon
                  class="dropdown-icon-more"
                  name="menu-more"
                  size="20"
                />
              </ElRow>
              <template #dropdown>
                <ElDropdownMenu :style="dropdownMenuStyle">
                  <ElDropdownItem
                    v-for="children in option.children"
                    :key="children.value"
                    :command="children.value"
                    @click="children.onClick ? children.onClick(children.value) : () => {}"
                  >
                    <ElRow
                      :class="{'active': children.active}"
                      class="dropdown-item"
                    >
                      <div
                        v-if="isActiveIcon(option.children)"
                        class="dropdown-icon-active"
                      >
                        <HeicSvgIcon
                          v-if="children.active"
                          name="menu-selected"
                          size="20"
                        />
                      </div>
                      <HeicSvgIcon
                        v-if="children.icon"
                        class="dropdown-icon"
                        :name="children.icon"
                        size="20"
                      />
                      <span>{{ children.label }}</span>
                    </ElRow>
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </template>
          <template v-else>
            <ElRow
              :class="{'active': option.active}"
              class="dropdown-item"
            >
              <div
                v-if="isActiveIcon(options)"
                class="dropdown-icon-active"
              >
                <HeicSvgIcon
                  v-if="option.active"
                  name="menu-selected"
                  size="20"
                />
              </div>
              <HeicSvgIcon
                v-if="option.icon"
                class="dropdown-icon"
                :name="option.icon"
                size="20"
              />
              <span>{{ option.label }}</span>
            </ElRow>
          </template>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item) {
  padding: 0;
}

.dropdown-item{
  width: 100%;
  height: 40px;
  padding: 5px 16px;
  box-sizing: border-box;

  &.active {
    color: var(--el-dropdown-menuItem-hover-color);
  }
}

.dropdown-icon {
  color: var(--el-text-color-regular);

  &-more {
    margin-right: 0;
    margin-left: 5px;
  }

  &-active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
  }
}
</style>
