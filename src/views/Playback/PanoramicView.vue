<script setup lang="ts">
import { computed } from "vue"
import { View360, EquirectProjection } from "@egjs/vue3-view360";
import { usePlayerStore, storeToRefs } from "@/stores"

const { currentFile } = storeToRefs(usePlayerStore())

const projection = computed(() => new EquirectProjection({
  src: currentFile.value.previewImage
}))
</script>

<template>
  <View360
    v-if="currentFile.state"
    :projection="projection"
    class="full-screen"
  />
</template>
