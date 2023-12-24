<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef } from 'vue'
import { storeToRefs, useConfigStore } from '@/stores'
import WelcomeComp from '@/views/Welcome.vue'

const { mode } = storeToRefs(useConfigStore())

const components = shallowRef<Partial<Record<GlobalApp.Mode, Component>>>({
  welcome: WelcomeComp
})
</script>

<template lang="pug">
component(:is="components[mode]")
</template>

<style scoped lang="scss">
</style>
