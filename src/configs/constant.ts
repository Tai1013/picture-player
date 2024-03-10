export const DIRECTION_LIST = [
  { value: "vertical", label: "垂直" },
  { value: "horizontal", label: "水平" }
] as const
const direction = DIRECTION_LIST.map((list) => list.value)
export type DirectionType = typeof direction[number]

export const IMAGE_BLUR_LIST = [
  { value: "off", label: "關閉" },
  { value: "on", label: "開啟" }
] as const
const imageBlur = IMAGE_BLUR_LIST.map((list) => list.value)
export type ImageBlurType = typeof imageBlur[number]

export const SPEED_LIST = [
  { value: 1, label: "1" },
  { value: 3, label: "3" },
  { value: 5, label: "5" },
  { value: 10, label: "10" }
] as const
const speed = SPEED_LIST.map((list) => list.value)
export type SpeedType = typeof speed[number]

export const EFFECT_LIST = [
  { value: "none", label: "無", duration: 0 },
  { value: "fade-out-fwd", label: "淡出", duration: 0.5 },
  { value: "bounce-in-top", label: "上方推入", duration: 1.1 },
  { value: "slide-out-bottom", label: "下方抽出", duration: 0.5 },
  { value: "slide-out-right", label: "右方抽出", duration: 0.5 },
  { value: "bounce-in-right", label: "右方推入", duration: 1.1 },
  { value: "slide-out-top", label: "上方抽出", duration: 0.5 }
] as const
const effect = EFFECT_LIST.map((list) => list.value)
export type EffectType = typeof effect[number]
