<script setup lang="ts">
import type { Swiper as SwiperClass } from "swiper"
import { ref, computed, watch } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { FreeMode, Mousewheel, Navigation } from "swiper/modules"
import { HeicImageContainer } from "@/components"
import { storeToRefs, usePlayerStore } from "@/stores"

const props = defineProps({
  nameVisable: {
    type: Boolean,
    default: true
  },
  delayed: {
    type: Boolean,
    default: false
  }
})

const { currentFile, delayedCurrentFile, files } = storeToRefs(usePlayerStore())
const { updateFile } = usePlayerStore()

const modules = [FreeMode, Mousewheel, Navigation]

const swiperRef = ref<SwiperClass>()

const innerCurrentFile = computed(() => {
  if (props.delayed) return delayedCurrentFile.value
  return currentFile.value
})

const handleClickFile = (file: GlobalApp.FileType) => {
  updateFile(file)
}

const handleSwiper = (swiper: SwiperClass) => {
  swiperRef.value = swiper
  swiperRef.value.update()
}

watch(() => files.value, () => {
  if (!swiperRef.value) return
  swiperRef.value.update()
})
</script>

<template>
  <div class="playlist-horizontal">
    <Swiper
      :modules="modules"
      free-mode
      mousewheel
      :navigation="{
        enabled: true,
        prevEl: 'button-prev',
        nextEl: 'button-next'
      }"
      :space-between="-3"
      slides-per-view="auto"
      @slider-move="handleSwiper"
      @slide-change="handleSwiper"
      @scroll="handleSwiper"
      @reach-beginning="handleSwiper"
      @reach-end="handleSwiper"
      @swiper="handleSwiper"
    >
      <SwiperSlide
        v-for="file in files"
        :key="`${file.path}/${file.name}`"
        :class="{'active': file.name === innerCurrentFile.name && file.path === innerCurrentFile.path}"
        class="cursor-pointer"
        lazy
        @click="handleClickFile(file)"
      >
        <HeicImageContainer
          :file="file"
          direction="horizontal"
          :name-visable="nameVisable"
        />
      </SwiperSlide>
    </Swiper>
    <button
      :class="{ 'swiper-button-disabled': swiperRef?.isBeginning }"
      class="swiper-button-prev"
      @click="swiperRef?.slidePrev()"
    />
    <button
      :class="{ 'swiper-button-disabled': swiperRef?.isEnd }"
      class="swiper-button-next"
      @click="swiperRef?.slideNext()"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/playList";
</style>
