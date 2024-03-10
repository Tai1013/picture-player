<script setup lang="ts">
import type { Component } from "vue"
import { ElContainer, ElConfigProvider } from "element-plus"
import { storeToRefs, useConfigStore } from "@/stores"
import WelcomeMode from "@/views/Welcome/index.vue"
import PlaybackMode from "@/views/Playback/index.vue"
import SlideshowMode from "@/views/Slideshow/index.vue"

const { mode, elementLocale } = storeToRefs(useConfigStore())

const components: Record<GlobalApp.Mode, Component | null> = {
  welcome: WelcomeMode,
  playback: PlaybackMode,
  slideshow: SlideshowMode
}
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <ElContainer>
      <component
        :is="components[mode]"
      />
    </ElContainer>
  </ElConfigProvider>
</template>
