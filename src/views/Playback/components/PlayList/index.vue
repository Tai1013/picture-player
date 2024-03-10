<script setup lang="ts">
import type { Component } from "vue"
import type { DirectionType } from "@/configs/constant"
import { HEicHorizontalList } from "@/components"
import { usePlayerStore, storeToRefs } from "@/stores"
import VerticalList from "./VerticalList.vue"

const { direction } = storeToRefs(usePlayerStore())

const listDirection: Record<DirectionType, Component> = {
  horizontal: HEicHorizontalList,
  vertical: VerticalList
}
</script>

<template>
  <component :is="listDirection[direction]" />
</template>
