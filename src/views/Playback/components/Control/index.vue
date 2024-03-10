<script setup lang="ts">
import { computed } from "vue"
import { ElRow, ElCol } from "element-plus"
import { HeicIconButton } from "@/components"
import { useConfigStore, usePlayerStore, storeToRefs } from "@/stores"
import SettingButton from "./SettingButton.vue"

const { isFullscreen } = storeToRefs(useConfigStore())
const { toggleFullscreen } = useConfigStore()
const { isPlaying, isPlayList, emptyFile } = storeToRefs(usePlayerStore())
const { pause, resume, playPrev, playNext } = usePlayerStore()

const playerButtons = computed((): GlobalApp.IconButtonType[] => [
  {
    icon: "player-previous",
    disabled: emptyFile.value,
    onClick: () => {
      playPrev()
    }
  },
  {
    icon: isPlaying.value ? "player-pause" : "player-play",
    disabled: emptyFile.value,
    onClick: () => {
      if (isPlaying.value || emptyFile.value) return pause()
      resume()
    }
  },
  {
    icon: "player-next",
    disabled: emptyFile.value,
    onClick: () => {
      playNext()
    }
  }
])

const controlButtons = computed((): GlobalApp.IconButtonType[] => [
  {
    tooltip: isFullscreen.value ? "離開全螢幕" : "全螢幕播放",
    icon: isFullscreen.value ? "player-fullscreen-exit" : "player-fullscreen",
    active: isFullscreen.value,
    onClick: () => {
      toggleFullscreen()
    }
  },
  {
    tooltip: "設定",
    icon: "player-setting"
  },
  {
    tooltip: "播放清單",
    icon: "player-playlist",
    active: isPlayList.value,
    onClick: () => {
      isPlayList.value = !isPlayList.value
    }
  }
])
</script>

<template>
  <div class="control-container pointer-events-none">
    <ElRow justify="space-between">
      <ElCol :span="6" />
      <ElCol :span="12">
        <ElRow justify="center">
          <HeicIconButton
            v-for="player in playerButtons"
            :key="player.icon"
            class="player-button"
            :icon="player.icon"
            :disabled="player.disabled"
            @click="player.onClick ? player.onClick() : () => {}"
          />
        </ElRow>
      </ElCol>
      <ElCol :span="6">
        <ElRow justify="end">
          <template
            v-for="control in controlButtons"
            :key="control.tooltip"
          >
            <SettingButton v-if="control.icon === 'player-setting'" />
            <HeicIconButton
              v-else
              :tooltip="control.tooltip"
              :icon="control.icon"
              :icon-size="control.iconSize"
              :active="control.active"
              @click="control.onClick ? control.onClick() : () => {}"
            />
          </template>
        </ElRow>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.control-container {
  padding: 36px 50px;
  width: 100%;
  box-sizing: border-box;
  background-image: linear-gradient(0deg, rgba(#000000, 0.5) 0%, transparent 100%);

  .player-button {
    margin: 0 18px;
  }
}
</style>
